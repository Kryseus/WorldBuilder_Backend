import { Router } from "express";
import {
  getAllMaps,
  getSingleMap,
  createSingleMap,
  updateSingleMap,
  deleteSingleMap,
  getVisibilityByUser,
  grantVisibility,
  removeVisibility
} from "../controllers/mapController.js"
import verifyToken from '../middlewares/verifyToken.js'

const mapRouter = Router();

mapRouter.get("/", getAllMaps);
mapRouter.get("/:id",  getSingleMap);
mapRouter.get("/:userId/user", getVisibilityByUser);
mapRouter.post("/", createSingleMap);
mapRouter.put("/:id", updateSingleMap);
mapRouter.put("/:id/visible/:userId", verifyToken, grantVisibility);
mapRouter.put("/:id/invisible/:userId", verifyToken, removeVisibility); 
mapRouter.delete("/:id", deleteSingleMap);

export default mapRouter;