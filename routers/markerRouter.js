import { Router } from "express";
import {
  getAllMarkers,
  getSingleMarker,
  createSingleMarker,
  updateSingleMarker,
  deleteSingleMarker,
} from "../controllers/markerController.js"

const markerRouter = Router();

markerRouter.get("/", getAllMarkers);
markerRouter.get("/:id", getSingleMarker);
markerRouter.post("/", createSingleMarker);
markerRouter.put("/:id", updateSingleMarker);
markerRouter.delete("/:id", deleteSingleMarker);

export default markerRouter;
