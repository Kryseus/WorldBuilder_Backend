import { Router } from "express";
import {
  getAllSettings,
  getSingleSetting,
  createSingleSetting,
  updateSingleSetting,
  deleteSingleSetting,
} from "../controllers/controllerSettings";

const routerSettings = Router();

router.get("/", getAllSettings);
router.get("/:id", getSingleSetting);
router.post("/", createSingleSetting);
router.put("/:id", updateSingleSetting);
router.delete("/:id", deleteSingleSetting);

export default routerSettings;
