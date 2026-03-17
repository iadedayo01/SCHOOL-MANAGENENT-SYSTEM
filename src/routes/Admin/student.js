import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { createStudentService, deleteStudentById, editStudentById, getAllStudents, getStudentById } from "../../Services/Admin/studentService.js";

const router = Router()

router.post("/create-student", verifyToken, createStudentService)
router.get("/students", verifyToken, getAllStudents)
router.get("/student/:id", verifyToken, getStudentById)
router.patch("/edit-student/:id", verifyToken, editStudentById)
router.delete("/delete-student/:id", verifyToken, deleteStudentById)


export default router