import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      requred: true,
    },
    avatarUrl: String,
  },

  {
    timeseries: true,
  }
);

const User = mongoose.model("users", UserSchema);

export { User };
