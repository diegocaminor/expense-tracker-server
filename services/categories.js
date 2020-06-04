const CategoryModel = require("../models/category");
const MongoLib = require("../lib/mongo");

class CategoriesService {
  constructor() {
    (this.model = CategoryModel), (this.mongoose = new MongoLib());
  }

  async getCategories() {
    console.log("getCategories");
    const query = {};
    const categories = await this.mongoose.getAll(this.model, query);
    return categories || [];
  }

  async getCategory({ categoryId }) {
    console.log("getCategory");
    const category = await this.mongoose.get(this.model, categoryId);
    return category || [];
  }

  async createCategory({ category }) {
    console.log("createCategory");
    const createdCategoryId = await this.mongoose.create(this.model, category);
    return createdCategoryId || [];
  }

  async updateCategory({ categoryId, category }) {
    console.log("createCategory");
    const updatedCategoryId = await this.mongoose.update(
      this.model,
      categoryId,
      category
    );
    return updatedCategoryId || [];
  }

  async deleteCategory({ categoryId }) {
    console.log("deleteCategory");
    const deletedCategoryId = await this.mongoose.delete(
      this.model,
      categoryId
    );
    return deletedCategoryId || [];
  }
}

module.exports = CategoriesService;
