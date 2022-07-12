import express from "express";
import "./db/mongoose.js";
import cors from "cors";

import { registerValidator } from "./validators/auth.js";
import { loginValidator } from "./validators/login.js";
import { postValidator } from "./validators/post..js";

import checkAuth from "./utils/checkAuth.js";
import { upload } from "./db/millter.js";
import * as authController from "./controllers/authController.js";
import * as userController from "./controllers/userContorller.js";
import * as postController from "./controllers/postController.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("server/data/uploads"));

app.get("/", (req, res) => {
  res.send("home page ");
});

app.post("/auth/login", loginValidator, authController.login);
app.post("/auth/register", registerValidator, authController.register);
app.get("/auth/me", checkAuth, authController.authCheck);

app.get("/users/:id", userController.getUserById);
app.delete("/users/:id", checkAuth, userController.deleteUserById);
app.put("/users/:id", checkAuth, userController.updateUserById);

app.get("/users", userController.getUsers);

app.get("/posts", postController.getAllPosts);
app.get("/posts/:id", postController.getPostById);
app.delete("/posts/:id", checkAuth, postController.deletePostById);
app.put("/posts/:id", checkAuth, postValidator, postController.updatePostById);
app.post("/posts", checkAuth, postValidator, postController.createPost);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/data/uploads${req.file.originalname}`,
  });
});

const PORT = 3030;
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`server run on ${PORT}`);
});
