import 'dotenv/config.js'
import './db/mongoose.js';
import express from "express";
import cors from 'cors';
import markerRouter from "./routers/markerRouter.js";
import settingsRouter from "./routers/settingsRouter.js";
import authRouter from './routers/authRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import mapRouter from './routers/mapRouter.js';


const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
);

app.use(express.json())
app.use("/auth", authRouter);
app.use("/markers", markerRouter);
app.use("/map", mapRouter);
app.use("/settings", settingsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
