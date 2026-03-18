
import express from "express"
import dotenv from "dotenv"
import { initDb } from "./src/config/db.js"
// routes
import authRoutes from "./src/routes/AUTH/auth.js"
import userRoutes from "./src/routes/User.js"
import teacherRoutes from "./src/routes/Admin/teacher.js"
import departmentRoutes from "./src/routes/Admin/department.js"
import subjectRoutes from "./src/routes/Admin/subject.js"
import studentRoutes from "./src/routes/Admin/student.js"
import announcementRoutes from "./src/routes/General/announcement.js"
import classRoutes from "./src/routes/Admin/class.js"

dotenv.config()

const app = express()

const port = process.env.PORT



app.use(express.json())
app.get("/try", async(req,res)=>{
    return res.send("fghjkl")
})

//routes
console.log("routes loaded")
app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.use("/teacher", teacherRoutes)

app.use("/department", departmentRoutes)

app.use("/subject", subjectRoutes)

app.use("/student", studentRoutes)

app.use("/announcement", announcementRoutes)

app.use("/class", classRoutes)

//https://localhost:PORT/auth/signup



app.listen(port, () => {
    console.log(`My server is running at https://localhost:${port}`)
    
})