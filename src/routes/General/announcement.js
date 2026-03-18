import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { createAnnouncementService, deleteAnnouncementById, editAnnouncementById, getAllAnnouncements, getAnnouncementById } from "../../Services/SHARED/announcementService.js";

const router = Router()

router.post("/create-announcement", verifyToken, createAnnouncementService)
router.get("/announcements", verifyToken, getAllAnnouncements)
router.get("/announcement/:id", verifyToken, getAnnouncementById)
router.patch("/edit-announcement/:id", verifyToken, editAnnouncementById)
router.delete("/delete-announcement/:id", verifyToken, deleteAnnouncementById)


export default router