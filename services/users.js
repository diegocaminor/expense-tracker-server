const { mockDocument } = require("../utils/mocks/mock");

class UsersService {
  async getUsers() {
    console.log("getUsers");
    const users = await Promise.resolve(mockDocument);
    return users || [];
  }

  async getUser() {
    console.log("getUser");
    const user = await Promise.resolve(mockDocument[0]);
    return user || [];
  }

  async createUser() {
    console.log("createUser");
    const createdUserId = await Promise.resolve(mockDocument[0]._id);
    return createdUserId || [];
  }

  async updateUser() {
    console.log("updateUser");
    const updatedUserId = await Promise.resolve(mockDocument[0]._id);
    return updatedUserId || [];
  }

  async deleteUser() {
    console.log("deleteUser");
    const deletedUserId = await Promise.resolve(mockDocument[0]._id);
    return deletedUserId || [];
  }
}

module.exports = UsersService;
