
import express from "express"
import dotenv from "dotenv"
import { initDb } from "./src/config/db.js"
// routes
import authRoutes from "./src/routes/AUTH/auth.js"
import userRoutes from "./src/routes/User.js"

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

//https://localhost:PORT/auth/signup



app.listen(port, () => {
    console.log(`My server is running at https://localhost:${port}`)
    initDb()
})