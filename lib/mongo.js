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
  connect() {
    if (!MongoLib.connection) {
      console.log("New connection!!!");
      MongoLib.connection = mongoose.connect(this.mongo_uri, this.options);
    } else {
      console.log("Same connection!!!");
    }

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
    return await document.save((err, data) => {
      if (err) throw err;
      return data._id;
    });
  }

  // Update one document related to specific model
  async update(model, id, updateData) {
    this.connect();
    return await model.findByIdAndUpdate(
      id,
      { $set: updateData },
      { upsert: true },
      (err, data) => {
        if (err) throw err;
        return data._id;
      }
    );
  }

  // Delete one document related to specific model
  async delete(model, id) {
    this.connect();
    return await model.findByIdAndRemove(id, (err, data) => {
      if (err) throw err;
      return data._id;
    });
  }
}

module.exports = MongoLib;
