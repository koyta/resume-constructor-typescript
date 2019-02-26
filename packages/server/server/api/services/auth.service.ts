import User from "../models/User";
import { Document } from "mongoose";
import { Profile } from "passport-github";

export class AuthService {
  findAndUpdateUser(
    profile: Profile,
    access_token: string
  ): Promise<Document | Error> {
    if (!access_token || !profile) {
      return Promise.reject(Error("No access token or profile here"));
    }

    return User.findOneAndUpdate(
      { username: profile.username },
      {
        username: profile.username,
        fullname: profile.displayName,
        email: profile.emails[0].value
      },
      { upsert: true, new: true }
    )
      .exec()
      .then(createdUser => Promise.resolve(createdUser))
      .catch(reason => Promise.reject(reason));
  }
}

export default new AuthService();
