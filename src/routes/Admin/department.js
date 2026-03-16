import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { deleteDepartmentById, departmentService, editDepartmentById, getAllDepartments, getDepartmentById } from "../../Services/Admin/departmentService.js";

const router = Router()

router.post("/create-department", verifyToken, departmentService)
router.get("/departments", verifyToken, getAllDepartments)
router.get("/department/:id", verifyToken, getDepartmentById)
router.patch("/edit-department/:id", verifyToken, editDepartmentById)
router.delete("/delete-department/:id", verifyToken, deleteDepartmentById)

export default router