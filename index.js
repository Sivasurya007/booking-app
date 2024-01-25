import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authroute from "./routes/auth.js"
import hotelsroute from "./routes/hotels.js"
import usersroute from "./routes/users.js"
import roomsroute from "./routes/rooms.js"
import cookieparser from "cookie-parser"

const app=express()

dotenv.config()

const connect=async ()=>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log("database is connected");
  } catch (error) {
    throw error;
  }    
}  
   
 
mongoose.connection.on("disconnected",()=>{
    console.log("database disconnected")  
}) 

//middlewares
app.use(cookieparser())
app.use(express.json()) 
app.use("/api/auth",authroute) 
app.use("/api/hotels",hotelsroute)
app.use("api/rooms",roomsroute) 
app.use("api/user",usersroute)

app.use((err,req,res,next)=>{    
  const errorstatus = err.status || 500
  const errormessage = err.message || "something went wrong"
  return res.status(errorstatus).json({
    success:false,
    status:errorstatus,
    message:errormessage,
    stack:err.stack
  })
})






app.listen(8800, ()=>{
    connect()
    console.log("connected.");
})
