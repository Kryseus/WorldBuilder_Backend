import express from "express";
import routerMarker from "./routers/routerMarker.js";
import routerSettings from "./routers/routerSettings.js";
import routerUser from "./routers/routerUser.js";

const app = express();
const port = process.env.PORT || 5000;

app.use("/marker", routerMarker);
app.use("/settings", routerSettings);
app.use("/user", routerUser);

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
