import mongoose from "mongoose";

const { model, Schema } = mongoose;

export const PUBLIC_USER_STRING = "username first_name last_name picture";
export const PRIVATE_USER_STRING =
  "_id username first_name last_name email picture";

const userSchema = new Schema({
  username: String,
  first_name: String,
  last_name: String,
  password: String,
  email: String,
  picture: String,
  created_at: Date,
});

const User = model("User", userSchema);

export default User;
