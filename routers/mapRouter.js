import { Router } from "express";
import {
  getAllMaps,
  getSingleMap,
  createSingleMap,
  updateSingleMap,
  deleteSingleMap,
} from "../controllers/mapController.js"

const mapRouter = Router();

mapRouter.get("/", getAllMaps);
mapRouter.get("/:id", getSingleMap);
mapRouter.post("/", createSingleMap);
mapRouter.put("/:id", updateSingleMap);
mapRouter.delete("/:id", deleteSingleMap);

export default mapRouter;