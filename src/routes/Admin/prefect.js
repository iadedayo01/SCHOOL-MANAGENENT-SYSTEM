import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { createPrefectService, deletePrefectById, editPrefectById, getAllPrefects, getPrefectById } from "../../Services/Admin/prefectService.js";

const router = Router()

router.post("/create-prefect", verifyToken, createPrefectService)
router.get("/prefects", verifyToken, getAllPrefects)
router.get("/prefect/:id", verifyToken, getPrefectById)
router.patch("/edit-prefect/:id", verifyToken, editPrefectById)
router.delete("/delete-prefect/:id", verifyToken, deletePrefectById)


export default router