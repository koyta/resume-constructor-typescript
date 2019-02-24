import l from "../../common/logger";
import User from "../models/User";
import { Document } from "mongoose";
import { userInfo } from "os";
import { Profile } from "passport-github";

export class AuthService {
  async findAndUpdateUser(profile: Profile, access_token: string) {
    try {
      const value: Document = await User.findOneAndUpdate(
        { username: profile.username },
        {
          $set: {
            username: profile.username,
            fullname: profile.name,
            email: profile.emails[0]
          }
        },
        { upsert: true }
      ).exec();
      return Promise.resolve({ value, access_token });
    } catch (reason) {
      l.error(reason);
      return Promise.reject(reason);
    }
  }
}

export default new AuthService();
