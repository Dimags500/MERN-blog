import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { validationResult } from "express-validator/src/validation-result.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findById(userID);

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findByIdAndDelete({ _id: userID });

    res.status(200).json({ succsess: true });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

const updateUserById = async (req, res) => {
  try {
    const errors = validationResult(req);
    const { id: userID } = req.params;

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    let post = await User.updateOne(
      { _id: userID },
      {
        fullName: req.body.fullName,
        email: req.body.email,
        avatarUrl: req.body.avatarUrl,
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant update user ",
    });
  }
};

export { getUsers, getUserById, deleteUserById, updateUserById };
