import { Router } from "express";
import {
  getAllUsers,
  getSingleUser,
  createSingleUser,
  updateSingleUser,
  deleteSingleUser,
} from "../controllers/controllerUser.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.post("/", createSingleUser);
router.put("/:id", updateSingleUser);
router.delete("/:id", deleteSingleUser);

export default routerUser;
