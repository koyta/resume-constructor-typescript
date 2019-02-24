/**
 * Endpoint root: /api/v1/users
 */

import express from "express";
import controller from "./controller";

export default express
  .Router()
  .get("/:id", controller.getOneUser)
  .get("/", controller.getAllUsers)
  .delete("/:id", controller.deleteUser)
  .put("/:id", controller.updateUser)
  .post("/", controller.createUser);
