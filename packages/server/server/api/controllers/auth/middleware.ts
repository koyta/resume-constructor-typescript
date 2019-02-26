import { Response, Request, NextFunction } from "express";
import HttpStatus from "http-status-codes";

class Middleware {
  basicAuthentication(req: Request, res: Response, next: NextFunction) {
    const auth = { login: "secret-login", password: "secret-password" };

    // parse login and password from headers
    const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
    const strauth = Buffer.from(b64auth, "base64").toString();
    const [_ = "", login = "", password = ""] =
      strauth.match(/(.*?):(.*)/) || [];

    // verify login and password are set and correct
    if (
      !login ||
      !password ||
      login !== auth.login ||
      password !== auth.password
    ) {
      res.set("WWW-Authenticate", 'Basic realm="401"');
      res.status(HttpStatus.UNAUTHORIZED).send("Authentication required.");
      return;
    }

    next();
  }
}

export default new Middleware();
