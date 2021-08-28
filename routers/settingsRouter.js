import { Router } from "express";
import {
  getAllSettings,
  getSingleSetting,
  createSingleSetting,
  updateSingleSetting,
  deleteSingleSetting,
} from "../controllers/settingController.js";
import verifyToken from '../middlewares/verifyToken.js'

const settingsRouter = Router();

settingsRouter.get("/", getAllSettings);
settingsRouter.get("/:id", getSingleSetting);
settingsRouter.post("/", verifyToken, createSingleSetting);
settingsRouter.put("/:id", verifyToken, updateSingleSetting);
settingsRouter.delete("/:id", verifyToken, deleteSingleSetting);

export default settingsRouter;
