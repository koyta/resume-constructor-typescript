import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import UserService from "../../services/user.service";

export class Controller {
  me(req: Request, res: Response): void {
    UserService.me(req.session.passport.user)
      .then(user => res.json({ data: user }))
      .catch(reason => res.json(reason));
  }

  getOneUser(req: Request, res: Response): void {
    UserService.getOneUser(req.params.id)
      .then(user => res.json({ data: user }))
      .catch(reason => res.json(reason));
  }

  getAllUsers(req: Request, res: Response): void {
    if (!req.query.admin) {
      res
        .status(HttpStatus.FORBIDDEN)
        .send({ error: HttpStatus.getStatusText(HttpStatus.FORBIDDEN) });
    }

    UserService.getAllUsers()
      .then(users => res.json({ data: users }))
      .catch(reason => res.json(reason));
  }

  createUser(req: Request, res: Response): void {
    if (!req.body.user) {
      res.sendStatus(400);
    }

    UserService.createUser(req.body.user)
      .then(user => res.json({ data: user }))
      .catch(reason => res.json(reason));
  }

  deleteUser(req: Request, res: Response): void {
    if (!req.params.id) {
      res.sendStatus(400);
    }

    UserService.deleteUser(req.params.id)
      .then(user => res.json({ data: user }))
      .catch(reason => res.json(reason));
  }

  updateUser(req: Request, res: Response): void {
    if (!req.params.id || !req.body.user) {
      res.sendStatus(400);
    }

    UserService.updateUser(req.params.id, req.body.user)
      .then(updatedUser => res.json({ data: updatedUser }))
      .catch(reason => res.json(reason));
  }
}
export default new Controller();
