const express = require("express");
const { mockDocument } = require("../utils/mocks/mock");

// Routes that are responsible for communicating with the users services
function usersApi(app) {
  const router = express.Router();
  app.use("/api/users", router);

  router.get("/", async function (req, res, next) {
    try {
      const users = await Promise.resolve(mockDocument);
      res.status(200).json({
        data: users,
        message: "users listed",
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:userId", async function (req, res, next) {
    try {
      const { userId } = req.params;
      const user = await Promise.resolve(mockDocument[0]);
      res.status(200).json({
        data: user,
        message: "user retrieve",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async function (req, res, next) {
    try {
      const { body: user } = req;
      const createdUserId = await Promise.resolve(mockDocument[0]._id);
      res.status(201).json({
        data: createdUserId,
        message: "user created",
      });
    } catch (err) {
      next(err);
    }
  });

  router.put("/:userId", async function (req, res, next) {
    try {
      const { userId } = req.params;
      const { body: user } = req;
      const updatedUserId = await Promise.resolve(mockDocument[0]._id);
      res.status(200).json({
        data: updatedUserId,
        message: "user updated",
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:userId", async function (req, res, next) {
    try {
      const { userId } = req.params;
      const deletedUserId = await Promise.resolve(mockDocument[0]._id);
      res.status(200).json({
        data: deletedUserId,
        message: "user deleted",
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = usersApi;