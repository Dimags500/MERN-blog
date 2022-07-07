import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "./db/mongoose.js";
import { validationResult } from "express-validator";

import bodyParser from "body-parser";
import mongoose from "mongoose";

import { registerValidator } from "./validators/auth.js";
import { User } from "./models/User.js";
import checkAuth from "./utils/checkAuth.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("all works");
});

// app.post("/auth/login", (req, res) => {
//   console.log(req.body.email);

//   const token = jwt.sign(
//     {
//       email: req.body.email,
//       fullName: "some name ",
//     },
//     "secret"
//   );

//   res.json({
//     success: true,
//     token,
//   });
// });

app.post("/auth/login", async (req, res) => {
  const userEmail = req.body.email;
  console.log(userEmail);
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return req.status(404).json({
        message: "user not found ",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return req.status(404).json({
        message: "wrong password or login ",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant login",
    });
  }
});

app.post("/auth/register", registerValidator, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "cant register",
    });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { id: userID } = req.params;
    const user = await User.findById(userID);

    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.get("/auth/me", checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "user not found ",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "access denied  ",
    });
  }
});

const PORT = 3030;
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`server run on ${PORT}`);
});
