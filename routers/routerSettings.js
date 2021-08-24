import { Router } from "express";
import {
  getAllSettings,
  getSingleSetting,
  createSingleSetting,
  updateSingleSetting,
  deleteSingleSetting,
} from "../controllers/controllerSettings.js";

const routerSettings = Router();

routerSettings.get("/", getAllSettings);
routerSettings.get("/:id", getSingleSetting);
routerSettings.post("/", createSingleSetting);
routerSettings.put("/:id", updateSingleSetting);
routerSettings.delete("/:id", deleteSingleSetting);

export default routerSettings;
