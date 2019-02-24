import { Application } from "express";
import authRouter from "./api/controllers/auth/router";
import userRouter from "./api/controllers/user/router";

export default function routes(app: Application): void {
  app.use("/api/v1/oauth", authRouter);
  app.use("/api/v1/users", userRouter);
}
