import { Router } from "express";
import {
  getAllMarkers,
  getSingleMarker,
  createSingleMarker,
  updateSingleMarker,
  deleteSingleMarker,
} from "../controllers/controllerMarker.js"

const routerMarker = Router();

routerMarker.get("/", getAllMarkers);
routerMarker.get("/:id", getSingleMarker);
routerMarker.post("/", createSingleMarker);
routerMarker.put("/:id", updateSingleMarker);
routerMarker.delete("/:id", deleteSingleMarker);

export default routerMarker;
