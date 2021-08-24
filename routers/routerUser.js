import { Router } from "express";
import {
  getAllUsers,
  getSingleUser,
  createSingleUser,
  updateSingleUser,
  deleteSingleUser,
} from "../controllers/controllerUser.js";

const routerUser = Router();

routerUser.get("/", getAllUsers);
routerUser.get("/:id", getSingleUser);
routerUser.post("/", createSingleUser);
routerUser.put("/:id", updateSingleUser);
routerUser.delete("/:id", deleteSingleUser);

export default routerUser;
