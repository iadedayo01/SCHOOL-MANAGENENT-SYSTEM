import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { createTeacherService, deleteTeacherById, editTeacherById, getAllTeachers, getTeacherById } from "../../Services/Admin/teacherService.js";

const router = Router()

router.post("/create-teacher", verifyToken, createTeacherService)
router.get("/teachers", verifyToken, getAllTeachers)
router.get("/teacher/:id", verifyToken, getTeacherById)
router.delete("/delete-teacher/:id", verifyToken, deleteTeacherById)
router.patch("/edit-teacher/:id", verifyToken, editTeacherById)
/**
 * get /teachers - get allthe teachers
 * get /teacher/id  
 * put/patch /teacher/:id
 * delete /teacher/:id
 */

export default router