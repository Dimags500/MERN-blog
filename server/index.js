import express from "express";
import "./db/mongoose.js";

import { registerValidator } from "./validators/auth.js";
import checkAuth from "./utils/checkAuth.js";
import * as userController from "./controllers/userContorller.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("home page ");
});

app.post("/auth/login", userController.userLogin);
app.post("/auth/register", registerValidator, userController.userRegister);
app.get("/auth/me", checkAuth, userController.userAuthCheck);

app.get("/users/:id", userController.getUserById);
app.delete("/users/:id", userController.deleteUserById);
app.put("/users/:id", userController.updateUserById);

app.get("/users", userController.getUsers);

const PORT = 3030;
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`server run on ${PORT}`);
});
