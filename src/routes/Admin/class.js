import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { createClassService, deleteClassById, editClassById, getAllClasses, getClassById } from "../../Services/Admin/classService.js";

const router = Router()

router.post("/create-class", verifyToken, createClassService)
router.get("/classes", verifyToken, getAllClasses)
router.get("/class/:id", verifyToken, getClassById)
router.patch("/edit-class/:id", verifyToken, editClassById)
router.delete("/delete-class/:id", verifyToken, deleteClassById)



export default router