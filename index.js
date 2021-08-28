import 'dotenv/config.js'
import express from "express";
import markerRouter from "./routers/markerRouter.js";
import settingsRouter from "./routers/settingsRouter.js";
import authRouter from './routers/authRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import verifyToken from './middlewares/verifyToken.js';
import characterRouter from "./routers/characterRouter.js"
import mapRouter from './routers/mapRouter.js';
import './db/mongoose.js'

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use("/markers", markerRouter);
app.use("/settings", settingsRouter);
app.use("/auth", authRouter);
app.use("/map", mapRouter);
app.use ("/character", characterRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
