import express from 'express'
import dotenv from 'dotenv'
import db from './config/db.js'
import cors from 'cors'
import router from './routes/user.routes.js'
import cookieParser from "cookie-parser";
dotenv.config({
    path:'.env'
})
const PORT=process.env.PORT ||4000
const app=express()
app.use(cors())

db()
app.use('/uploads',express.static('uploads'))
app.use((req,res,next)=>{
        res.setHeader("Access-Control-Allow-Origin","http://localhost:3000"); 
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         next();
       })
app.use(express.json())
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("test"))
app.use(cookieParser())
app.use('/api/v1',router);
app.listen(PORT,()=>{
    console.log(`app is listining at port ${PORT}`)
})