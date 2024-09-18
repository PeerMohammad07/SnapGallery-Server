import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan";
import path from "path";
import cookieParser from 'cookie-parser';
import connectDB from "./infrastructure/config/db";
import router from "./infrastructure/routes/router";

const app = express()

// Config the Dotenv
dotenv.config()

// Use morgan middleware to log HTTP requests
app.use(morgan("dev"))

// Setting Cors 
app.use(cors({
  origin: "*",
  credentials: true,
}));


app.use(cookieParser())

// For parsing application/json
app.use(express.json()); 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, "../infrastructure/public")));

app.use("/api",router)

// Mongodb Connect
connectDB()

// Server 
const PORT = process.env.PORT||7000
app.listen(PORT,()=>{
  console.log(`Server is running : http://localhost:${PORT}`)
})

export default app