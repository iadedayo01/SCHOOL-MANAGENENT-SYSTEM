import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { createSubjectService, deleteSubjectById, editSubjectById, getAllSubjects, getSubjectById } from "../../Services/Admin/subjectService.js";


const router = Router()

router.post("/create-subject", verifyToken, createSubjectService)
router.get("/subjects", verifyToken, getAllSubjects)
router.get("/subject/:id", verifyToken, getSubjectById)
router.patch("/edit-subject/:id", verifyToken, editSubjectById)
router.delete("/delete-subject/:id", verifyToken, deleteSubjectById)


export default router