import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.cswya.mongodb.net/?retryWrites=true&w=majority`;

// mongoose.connect(URL, (error, mongoDBInstance) => {
//   if (error) {
//     throw new Error("mongoDB connec error ", error);
//   }
//   if (!process.env.NODE_END || process.env.NODE.ENV === "DEVELOPMENT") {
//     const { host, port, name } = mongoDBInstance;
//     console.log(host, port, name);
//   }
// });

const connectURL =
  "mongodb+srv://nick:lq0qSc6xuS8HjkbW@cluster0.nezyc.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(connectURL)
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));
