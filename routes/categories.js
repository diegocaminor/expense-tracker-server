const express = require("express");
const { mockDocument } = require("../utils/mocks/mock");

// Routes that are responsible for communicating with the categories services
function categoriesApi(app) {
  const router = express.Router();
  app.use("/api/categories", router);

  router.get("/", async function (req, res, next) {
    try {
      const categories = await Promise.resolve(mockDocument);
      res.status(200).json({
        data: categories,
        message: "categories listed",
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:categoryId", async function (req, res, next) {
    try {
      const { categoryId } = req.params;
      const category = await Promise.resolve(mockDocument[0]);
      res.status(200).json({
        data: category,
        message: "category retrieve",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async function (req, res, next) {
    try {
      const { body: category } = req;
      console.log("ñañaññaña");
      console.log(category);
      const createdCategoryId = await Promise.resolve(mockDocument[0]._id);
      res.status(201).json({
        data: createdCategoryId,
        message: "category created",
      });
    } catch (err) {
      next(err);
    }
  });

  router.put("/:categoryId", async function (req, res, next) {
    try {
      const { categoryId } = req.params;
      const { body: category } = req;
      const updatedCategoryId = await Promise.resolve(mockDocument[0]._id);
      res.status(200).json({
        data: updatedCategoryId,
        message: "category updated",
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:categoryId", async function (req, res, next) {
    try {
      const { categoryId } = req.params;
      const deletedCategoryId = await Promise.resolve(mockDocument[0]._id);
      res.status(200).json({
        data: deletedCategoryId,
        message: "category deleted",
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = categoriesApi;
