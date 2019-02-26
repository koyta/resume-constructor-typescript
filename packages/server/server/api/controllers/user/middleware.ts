import { NextFunction, Request, Response } from "express";
import UserService from "../../services/user.service";
import HttpStatus from "http-status-codes";

class Middleware {
  checkMe(req: Request, res: Response, next: NextFunction) {
    if (req.params.id === "me") {
      if (!req.session || !req.session.passport || !req.session.passport.user) {
        res.status(HttpStatus.UNAUTHORIZED).end();
        return;
      }

      UserService.me(req.session.passport.user)
        .then(user => res.json({ data: user }))
        .catch(reason => res.json(reason));
    } else next();
  }
}

export default new Middleware();
