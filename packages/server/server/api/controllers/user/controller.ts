import { Request, Response } from "express";
import UserService from "../../services/user.service";

export class Controller {
  me(req: Request, res: Response): void {
    UserService.me(req.session.passport.user)
      .then(user =>
        res.json({
          type: "GET",
          request: "/users/me",
          data: user
        })
      )
      .catch(reason => res.json(reason));
  }
}
export default new Controller();
