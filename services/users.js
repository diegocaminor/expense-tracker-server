const UserModel = require("../models/user");
const MongoLib = require("../lib/mongo");
const bcrypt = require("bcrypt");
const chalk = require("chalk");

class UsersService {
  constructor() {
    (this.model = UserModel), (this.mongoose = new MongoLib());
  }

  async getUsers({ query }) {
    const users = await this.mongoose.getAll(this.model, query);
    return users || [];
  }

  async getUser({ userId }) {
    const user = await this.mongoose.get(this.model, userId);
    return user || [];
  }

  async getOrCreateUser({ user }) {
    let query = { email: user.email };
    const queriedUser = await this.getUsers({ query });
    if (queriedUser) {
      return queriedUser;
    }
    await this.createUser({ user });
    query = { email: user.email };
    return await this.getUsers({ query });
  }

  async createUser({ user }) {
    const { password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    const createdUserId = await this.mongoose.create(this.model, user);
    return createdUserId || [];
  }

  async updateUser({ userId, user }) {
    const updatedUserId = await this.mongoose.update(this.model, userId, user);
    return updatedUserId || [];
  }

  async deleteUser({ userId }) {
    const deletedUserId = await this.mongoose.delete(this.model, userId);
    return deletedUserId || [];
  }
}

module.exports = UsersService;
