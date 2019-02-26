import { Request, Response, NextFunction } from "express";
import l from "../../../common/logger";
import UserService from "../../services/user.service";
import { IUserBase } from "../../models/User";

export class Controller {
  passportGithubCallback(req: Request, res: Response): void {
    res.redirect("/");
  }

  logout(req: Request, res: Response): void {
    req.logout();
    res.redirect("/");
  }

  register(req: Request, res: Response): void {
    const { ...user } = req.body;
    l.info("New user registering", user);
    UserService.createUser(user)
      .then(createdUser => {
        l.info(`User registered: ${createdUser}`);
        res.json({ data: createdUser }).status(201);
      })
      .catch(err => {
        res.json(err).status(400);
        l.error(err);
      });
  }
}

export default new Controller();
