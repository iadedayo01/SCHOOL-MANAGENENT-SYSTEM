import { Router } from "express";
import {deleteAllSchoolsService , deleteSchoolByIdService } from "../Services/User/UserService.js";

const router = Router()

router.delete("/delete_schools", deleteAllSchoolsService)
router.delete("/delete_school/:id", deleteSchoolByIdService)

export default router