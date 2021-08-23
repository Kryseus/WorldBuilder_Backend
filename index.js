import express from "express";
import router from "./routers/router.js";

const app = express();
const port = process.env.PORT || 5000;

app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", function (req, res) {
  res.send("Got a POST request");
});

app.put("/user", function (req, res) {
  res.send("Got a PUT request at /user");
});

app.delete("/user", function (req, res) {
  res.send("Got a DELETE request at /user");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
