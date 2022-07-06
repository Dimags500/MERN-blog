import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("all works");
});

const PORT = 3030;
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`server run on ${PORT}`);
});
