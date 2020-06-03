const { mockDocument } = require("../utils/mocks/mock");

class CategoriesService {
  async getCategories() {
    console.log("getCategories");
    const categories = await Promise.resolve(mockDocument);
    return categories || [];
  }

  async getCategory() {
    console.log("getCategory");
    const category = await Promise.resolve(mockDocument[0]);
    return category || [];
  }

  async createCategory() {
    console.log("createCategory");
    const createdCategoryId = await Promise.resolve(mockDocument[0]._id);
    return createdCategoryId || [];
  }

  async updateCategory() {
    console.log("createCategory");
    const updatedCategoryId = await Promise.resolve(mockDocument[0]._id);
    return updatedCategoryId || [];
  }

  async deleteCategory() {
    console.log("deleteCategory");
    const deletedCategoryId = await Promise.resolve(mockDocument[0]._id);
    return deletedCategoryId || [];
  }
}

module.exports = CategoriesService;
