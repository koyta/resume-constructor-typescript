import { model, Schema, HookNextFunction, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

export interface IUserBase extends Document {
  _id: string;
  username: string;
  fullname: string;
}

export interface IUserWithPassword extends IUserBase {
  password: string;
}

const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String },
  fullname: { type: String, required: true }
});

UserSchema.pre<IUserWithPassword>("save", function(next: HookNextFunction) {
  // only hash the password if it has been modified (or is new)
  const user = this;
  if (!user.password) return next();
  if (!user.isModified("password")) return next();
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

export default model("User", UserSchema);
