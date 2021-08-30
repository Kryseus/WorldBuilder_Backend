import { Router } from "express";
import {
  getAllCharacters,
  getSingleCharacter,
  createSingleCharacter,
  updateSingleCharacter,
  deleteSingleCharacter,
  getVisibilityByUser,
  grantVisibility,
  removeVisibility
} from "../controllers/characterController.js"
import verifyToken from '../middlewares/verifyToken.js'

const characterRouter = Router();

characterRouter.get("/", getAllCharacters);
characterRouter.get("/:id", getSingleCharacter);
characterRouter.get("/:userId/user", getVisibilityByUser);
characterRouter.post("/", createSingleCharacter);
characterRouter.put("/:id", updateSingleCharacter);
characterRouter.put("/:id/visible/:userId", verifyToken, grantVisibility);
characterRouter.put("/:id/invisible/:userId", verifyToken, removeVisibility); 
characterRouter.delete("/:id", deleteSingleCharacter);

export default characterRouter;