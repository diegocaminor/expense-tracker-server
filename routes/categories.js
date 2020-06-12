const express = require("express");
const passport = require("passport");
var ObjectId = require("mongoose").Types.ObjectId;
const CategoriesService = require("../services/categories");

// JWT Strategy
require("../utils/auth/strategies/jwt");

// Routes that are responsible for communicating with the categories services
function categoriesApi(app) {
  const router = express.Router();
  app.use("/api/categories", router);
  const categoriesService = new CategoriesService();

  router.get(
    "/:type",
    // passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      const query = { type: req.params.type };
      try {
        const categories = await categoriesService.getCategories({ query });
        res.status(200).json({
          data: categories,
          message: "categories listed",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    "/:categoryId",
    // passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      try {
        const { categoryId } = req.params;
        if (!ObjectId.isValid(categoryId)) throw new Error("Invalid id");
        const category = await categoriesService.getCategory({ categoryId });
        res.status(200).json({
          data: category,
          message: "category retrieve",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    "/",
    // passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      try {
        const { body: category } = req;
        const createdCategoryId = await categoriesService.createCategory({
          category,
        });
        res.status(201).json({
          data: createdCategoryId,
          message: "category created",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/:categoryId",
    // passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      try {
        const { categoryId } = req.params;
        const { body: category } = req;
        const updatedCategoryId = await categoriesService.updateCategory({
          categoryId,
          category,
        });
        res.status(200).json({
          data: updatedCategoryId,
          message: "category updated",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    "/:categoryId",
    // passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      try {
        const { categoryId } = req.params;
        const deletedCategoryId = await categoriesService.deleteCategory({
          categoryId,
        });
        res.status(200).json({
          data: deletedCategoryId,
          message: "category deleted",
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = categoriesApi;
