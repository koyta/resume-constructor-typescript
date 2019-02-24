import { Request, Response } from "express";
import UserService from "../../services/user.service";

export class Controller {
  me(req: Request, res: Response): void {
    UserService.me(req.session.passport.user)
      .then(user => res.json({ data: user }))
      .catch(reason => res.json(reason));
  }

  getOneUser(req: Request, res: Response): void {
    if (req.params.id === "me") {
      UserService.me(req.session.passport.user)
        .then(user => res.json({ data: user }))
        .catch(reason => res.json(reason));
    } else {
      UserService.getOneUser(req.params.id)
        .then(user => res.json({ data: user }))
        .catch(reason => res.json(reason));
    }
  }

  getAllUsers(req: Request, res: Response): void {
    UserService.getAllUsers()
      .then(users => res.json({ data: users }))
      .catch(reason => res.json(reason));
  }

  createUser(req: Request, res: Response): void {
    UserService.createUser(req.body.user)
      .then(user => res.json({ data: user }))
      .catch(reason => res.json(reason));
  }

  deleteUser(req: Request, res: Response): void {
    UserService.deleteUser(req.params.id)
      .then(user => res.json({ data: user }))
      .catch(reason => res.json(reason));
  }

  updateUser(req: Request, res: Response): void {
    UserService.updateUser(req.params.id, req.body.user)
      .then(user => res.json({ data: user }))
      .catch(reason => res.json(reason));
  }
}
export default new Controller();
