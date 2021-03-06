/**
 * Endpoint root: /api/v1/oauth
 */

import express from "express";
import passport from "passport";
import controller from "./controller";
import middleware from "./middleware";

export default express
  .Router()
  .get(`/github`, passport.authenticate("github"))
  .get(
    "/github/callback",
    passport.authenticate("github"),
    controller.passportGithubCallback
  )
  .get("/logout", controller.logout)
  .post("/register", middleware.basicAuthentication, controller.register);
