/**
 * Endpoint root: /api/v1/users
 */

import express from "express";
import controller from "./controller";
import middleware from "./middleware";

export default express
  .Router()
  .get("/:id", middleware.checkMe, controller.getOneUser)
  .get("/", controller.getAllUsers)
  .delete("/:id", controller.deleteUser)
  .put("/:id", controller.updateUser)
  .post("/", controller.createUser);
