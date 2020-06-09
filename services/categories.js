const CategoryModel = require("../models/category");
const MongoLib = require("../lib/mongo");

class CategoriesService {
  constructor() {
    (this.model = CategoryModel), (this.mongoose = new MongoLib());
  }

  async getCategories() {
    const query = {};
    const categories = await this.mongoose.getAll(this.model, query);
    return categories || [];
  }

  async getCategory({ categoryId }) {
    const category = await this.mongoose.get(this.model, categoryId);
    return category || [];
  }

  async createCategory({ category }) {
    if (!category.name) category.name = category.name.toLowerCase();
    const createdCategoryId = await this.mongoose.create(this.model, category);
    return createdCategoryId || [];
  }

  async updateCategory({ categoryId, category }) {
    const updatedCategoryId = await this.mongoose.update(
      this.model,
      categoryId,
      category
    );
    return updatedCategoryId || [];
  }

  async deleteCategory({ categoryId }) {
    const deletedCategoryId = await this.mongoose.delete(
      this.model,
      categoryId
    );
    return deletedCategoryId || [];
  }
}

module.exports = CategoriesService;
