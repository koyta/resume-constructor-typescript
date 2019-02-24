import { model, Schema, HookNextFunction, Document } from "mongoose";
import { genSalt, hash } from "bcrypt";

const SALT_WORK_FACTOR = 10;

export interface IUser extends Document {
  _id: string;
  username: string;
  password?: string;
  fullname: string;
}

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String },
  fullname: { type: String, required: true }
});

// UserSchema.pre<IUser>("save", function(next: HookNextFunction) {
//   // only hash the password if it has been modified (or is new)
//   if (!this.isModified("password")) return next();

//   // generate a salt
//   genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if (err) return next(err);

//     // hash the password along with our new salt
//     hash(this.password, salt, function(err, hash) {
//       if (err) return next(err);

//       // override the cleartext password with the hashed one
//       this.password = hash;
//       next();
//     });
//   });
// });

export default model("User", UserSchema);
