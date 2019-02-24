import User from "../models/User";
import { Document } from "mongoose";
import { Profile } from "passport-github";
import l from "../../common/logger";

export class UserService {
  async me(profile: Profile): Promise<Object> {
    return User.findOne({ username: profile.username })
      .exec()
      .then(value => {
        l.info(value);
        return value;
      })
      .catch(err => {
        l.error(err);
        return Promise.reject(err);
      });
  }
}

export default new UserService();
