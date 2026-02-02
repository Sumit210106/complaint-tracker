import { Router } from "express";
import complaintController from "../controllers/complaint.controller";

const router = Router();

router.post("/", complaintController.create);
router.get("/", complaintController.getAll);
router.get("/:id", complaintController.getById);
router.put("/:id", complaintController.update);
router.delete("/:id", complaintController.delete);

export default router;
