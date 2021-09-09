import { Router } from "express";
import {
  getAllMarkers,
  getSingleMarker,
  createSingleMarker,
  updateSingleMarker,
  deleteSingleMarker,
  getVisibilityByUser,
  grantVisibility,
  removeVisibility
} from "../controllers/markerController.js"
import verifyToken from '../middlewares/verifyToken.js'

const markerRouter = Router();

markerRouter.get("/", getAllMarkers);
markerRouter.get("/:id",verifyToken, getSingleMarker);
markerRouter.get("/:userId/user", getVisibilityByUser);
markerRouter.post("/", verifyToken, createSingleMarker);
markerRouter.put("/:id", updateSingleMarker);
markerRouter.put("/:id/visible/:userId", verifyToken, grantVisibility);
markerRouter.put("/:id/invisible/:userId", verifyToken, removeVisibility); 
markerRouter.delete("/:id", deleteSingleMarker);

export default markerRouter;
