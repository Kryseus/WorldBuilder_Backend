import { Router } from "express";
import {
  getAllSettings,
  getSingleSetting,
  createSingleSetting,
  updateSingleSetting,
  deleteSingleSetting,
} from "../controllers/controllerSettings.js";
import verifyToken from '../middlewares/verifyToken.js'

const routerSettings = Router();

routerSettings.get("/", getAllSettings);
routerSettings.get("/:id", getSingleSetting);
routerSettings.post("/", verifyToken, createSingleSetting);
routerSettings.put("/:id", verifyToken, updateSingleSetting);
routerSettings.delete("/:id", deleteSingleSetting);

export default routerSettings;
