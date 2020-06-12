const mongoose = require("mongoose");
const { config } = require("../config/index");

const USER = config.dbUser;
const PASSWORD = config.dbPassword;
const DB_HOST = config.dbHost;
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}`;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

class MongoLib {
  constructor() {
    this.mongo_uri = MONGO_URI;
    this.options = OPTIONS;
  }

  // Connect to DB using singleton pattern
  async connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = await mongoose.connect(
        this.mongo_uri,
        this.options
      );
    }

    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on("connected", function () {
      console.log("Mongoose default connection open to " + MONGO_URI);
    });

    // If the connection throws an error
    mongoose.connection.on("error", function (err) {
      console.log("Mongoose default connection error: " + err);
      next(err);
    });

    // When the connection is disconnected
    mongoose.connection.on("disconnected", function () {
      console.log("Mongoose default connection disconnected");
    });

    return MongoLib.connection;
  }

  // Get all data related to specific model
  async getAll(model, query) {
    this.connect();
    return await model.find(query, (err, data) => {
      if (err) throw err;
      return data;
    });
  }

  // Get one document related to specific model
  async get(model, id) {
    this.connect();
    return await model.findOne({ _id: id }, (err, data) => {
      if (err) throw err;
      return data;
    });
  }

  // Create one document related to specific model
  async create(model, data) {
    this.connect();
    let document = new model(data);
    let savedData = await document.save();
    return savedData._id;
  }

  // Update one document related to specific model
  async update(model, id, data) {
    this.connect();
    let updatedData = await model.findByIdAndUpdate(
      id,
      { $set: data },
      { upsert: true }
    );
    return updatedData._id;
  }

  // Delete one document related to specific model
  async delete(model, id) {
    this.connect();
    let deletedData = await model.findByIdAndDelete(id);
    return deletedData ? deletedData._id : "";
  }
}

module.exports = MongoLib;
