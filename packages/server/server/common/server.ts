import express from "express";
import { Application, Express } from "express";
import path from "path";
import bodyParser from "body-parser";
import http from "http";
import os from "os";
import passport from "passport";
import morgan from "morgan";
import swaggerify from "./swagger";
import l from "./logger";
import mongoSetup from "../config/mongoSetup";
import passportSetup from "../config/passportSetup";

const app = express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + "/../..");
    app.set("appPath", root + "client");
    app.use(morgan("combined"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static(`${root}/public`));

    const { mongooseConnection, sess } = mongoSetup();
    app.use(sess);

    passportSetup();
    app.use(passport.initialize());
    app.use(passport.session());
  }

  router(routes: (app: Application) => void): ExpressServer {
    swaggerify(app, routes);
    return this;
  }

  listen(p: string | number = process.env.PORT): Application {
    const welcome = (port: number | string) => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          "development"} @: ${os.hostname()} on port: ${port}}`
      );
    http.createServer(app).listen(p, welcome(p));
    return app;
  }
}
