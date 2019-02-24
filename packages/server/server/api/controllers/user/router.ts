import express from "express";
import passport from "passport";
import controller from "./controller";
export default express.Router().get(`/me`, controller.me);
// .get(`/`);
