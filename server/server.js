import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./config/db.js"
import adminRouter from "./routes/adminRoutes.js"
import blogRouter from "./routes/blogRoutes.js"

// allow multiple origin
const allowOrigins = ["http://localhost:5173" ]

const app = express()
const PORT = process.env.PORT || 3000 
app.use(cors({
    origin: allowOrigins,
    credentials: true
}))

await connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Router
app.get("/" , (req, res) => {
    res.send("API is working")
})
app.use("/api/admin", adminRouter)
app.use("/api/blog", blogRouter)



app.listen( PORT, () => {
    console.log("server is running at", PORT);
    
})