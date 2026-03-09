import { Router } from "express";
import signupService from "../../Services/Auth/signupService.js";
import { signinService } from "../../Services/Auth/signinService.js";
import { ResetPassword } from "../../Services/Auth/ResetPasswordService.js";

const router = Router()

router.post("/signup", signupService);
router.post("/signin",signinService)
router.post("/reset-password/:id", ResetPassword)
router.get("/test", ()=>{
    console.log("hello")
})

export default router