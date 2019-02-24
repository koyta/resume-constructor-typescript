import { Request, Response } from "express";
import l from "../../../common/logger";

export class Controller {
  passportGithubCallback(req: Request, res: Response): void {
    res.redirect("/");
  }

  logout(req: Request, res: Response): void {
    req.logout();
    res.redirect("/");
  }
}
export default new Controller();
