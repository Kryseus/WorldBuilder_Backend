import { Router } from "express";
import {
  getAll,
  getSingle,
  createSingle,
  updateSingle,
  deleteSingle,
} from "../controllers/controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getSingle);
router.post("/", createSingle);
router.put("/:id", updateSingle);
router.delete("/:id", deleteSingle);

export default router;
