import { Router } from "express";
import {
  getAllMarkers,
  getSingleMarker,
  createSingleMarker,
  updateSingleMarker,
  deleteSingleMarker,
} from "../controllers/controllerMarker";

const routerMarker = Router();

router.get("/", getAllMarkers);
router.get("/:id", getSingleMarker);
router.post("/", createSingleMarker);
router.put("/:id", updateSingleMarker);
router.delete("/:id", deleteSingleMarker);

export default routerMarker;
