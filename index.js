import 'dotenv/config.js'
import express from "express";
import routerMarker from "./routers/routerMarker.js";
import routerSettings from "./routers/routerSettings.js";
import routerAuth from './routers/routerAuth.js';
import errorHandler from './middlewares/errorHandler.js';
import verifyToken from './middlewares/verifyToken.js';
import './db/mongoose.js'

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use("/markers", routerMarker);
app.use("/settings", routerSettings);
app.use("/auth", routerAuth);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
