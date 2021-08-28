import { Router } from "express";
import {
  getAllCharacters,
  getSingleCharacter,
  createSingleCharacter,
  updateSingleCharacter,
  deleteSingleCharacter,
} from "../controllers/characterController.js"

const characterRouter = Router();

characterRouter.get("/", getAllCharacters);
characterRouter.get("/:id", getSingleCharacter);
characterRouter.post("/", createSingleCharacter);
characterRouter.put("/:id", updateSingleCharacter);
characterRouter.delete("/:id", deleteSingleCharacter);

export default characterRouter;