import { User } from "../models/user.model.js";
import Jwt from "jsonwebtoken";
export const verifyJWT=async (req,res,next)=>{
   try {
    //const token = req.body || req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
    const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
    console.log("I am here",token)
     if(!token){
        return res.status(401).json({
            sucess:false,
            message:"token not found"
        })
     }
    const decodedToken= Jwt.verify(token.token,process.env.ACCESS_TOKEN_SECREAT)
    console.log("14",decodedToken)
  const user=  await User.findById(decodedToken?._id).select("-password -refreshToken")
 if(!user){
    return res.status(401).json({
      
        sucess:false,
        message:"invalid acess token"
    })
 }
 
 req.user=user;
 next()
   } catch (error) {
   console.log("27",error)
   return res.status(500).json({
    sucess:false,
    message:"invalid token"
   })
   }
}