import mongoose from "mongoose";
import { MongoError } from "mongodb";
import l from "../common/logger";
import session from "express-session";
import { Express } from "express";
const MongoStore = require("connect-mongo")(session);

export default () => {
  mongoose.set("useNewUrlParser", true);
  const mongooseConnection = mongoose.connect(
    process.env.MONGODB_URI,
    (error: MongoError) => {
      try {
        if (!error) l.info("Connected to MongoDB");
      } catch (e) {
        l.error(`Can't connect to MongoDB. [${error.code}] - ${error.message}`);
      }
    }
  );

  const sess = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production"
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  });

  return { mongooseConnection, sess };
};
