import express from "express";
import passport from "passport";
import controller from "./controller";
export default express
  .Router()
  .get(`/github`, passport.authenticate("github"))
  .get(
    "/github/callback",
    passport.authenticate("github"),
    controller.passportGithubCallback
  )
  .get("/logout", controller.logout);
