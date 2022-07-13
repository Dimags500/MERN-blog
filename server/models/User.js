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
    passwordHash: {
      type: String,
      requred: true,
    },
    avatarUrl: String,
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("user", UserSchema);

export { User };
