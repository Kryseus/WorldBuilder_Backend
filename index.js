import 'dotenv/config.js'
import express from "express";
import routerMarker from "./routers/routerMarker.js";
import routerSettings from "./routers/routerSettings.js";
import routerUser from "./routers/routerUser.js";
import authRouter from './routers/authRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import verifyToken from './middlewares/verifyToken.js';
import './db/mongoose.js'

const app = express();
const port = process.env.PORT || 5000;

app.use("/markers", routerMarker);
app.use("/settings", routerSettings);
app.use("/users", routerUser);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
