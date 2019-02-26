import User, { IUserBase, IUserWithPassword } from "../models/User";
import { Profile } from "passport-github";
import { Document } from "mongoose";

class UserService {
  async getOneUser(id: string): Promise<Document | Error> {
    if (!id) return Promise.reject(Error("You should provide ID of user"));
    return User.findById(id)
      .exec()
      .then(user => Promise.resolve(user))
      .catch(err => Promise.reject(err));
  }

  async getAllUsers(): Promise<Document[] | Error> {
    return User.find()
      .exec()
      .then(users => Promise.resolve(users))
      .catch(err => Promise.reject(err));
  }

  async createUser(user: IUserWithPassword): Promise<Document | Error> {
    if (!user) {
      return Promise.reject(Error("You should provide new user object"));
    }

    return User.create(user)
      .then(createdUser => Promise.resolve(createdUser))
      .catch(err => Promise.reject(err));
  }

  async deleteUser(id: string): Promise<Document | Error> {
    if (!id) return Promise.reject(Error("You should provide ID"));

    return User.findByIdAndDelete(id)
      .exec()
      .then(document => Promise.resolve(document))
      .catch(err => Promise.reject(err));
  }

  async updateUser(
    id: string,
    user: IUserBase | IUserWithPassword
  ): Promise<Document | Error> {
    if (!id || !user) {
      return Promise.reject(Error("You should provide ID and new User object"));
    }

    return User.findByIdAndUpdate(id, user, { new: true })
      .exec()
      .then(updatedUser => Promise.resolve(updatedUser))
      .catch(err => Promise.reject(err));
  }

  async me(profile: Profile): Promise<Document | Error> {
    return User.findOne({ username: profile.username })
      .exec()
      .then(doc => Promise.resolve(doc))
      .catch(err => Promise.reject(err));
  }
}

export default new UserService();
