import { Router } from "express";
import {
  getAllSettings,
  getSingleSetting,
  createSingleSetting,
  updateSingleSetting,
  deleteSingleSetting,
  inviteUser,
  kickUser,
  getSettingsByUser
} from "../controllers/settingController.js";
import verifyToken from '../middlewares/verifyToken.js'

const settingsRouter = Router();

settingsRouter.get("/",verifyToken, getAllSettings);
settingsRouter.get("/user",verifyToken, getSettingsByUser); //added 30.08.
settingsRouter.get("/:id", getSingleSetting);
settingsRouter.post("/", verifyToken, createSingleSetting);
settingsRouter.put("/:id", verifyToken, updateSingleSetting);
settingsRouter.put("/:id/invite/:userId", verifyToken, inviteUser);
settingsRouter.put("/:id/kick/:userId", verifyToken, kickUser); //added 30.08.
settingsRouter.delete("/:id", verifyToken, deleteSingleSetting);

export default settingsRouter;
