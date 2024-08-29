import {User} from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
//import { generateAcessToken,generateRefreshToken } from '../models/user.model.js';
//generate acess and refresh token
const generateAccessAndRefereshTokens = async(userId,res) =>{
    try {
        const user = await User.findById(userId)
        console.log("10",user)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
       // accessToken.then(()=>console.log(accessToken))
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Something went wrong while generating referesh and access token",
            sucess:false,
        })
    }
}

const register=async(req,res)=>{
    try{
       const {fullName,email,phoneNumber,password}=req.body;
       console.log(req.body)
       if(!fullName || !email || !phoneNumber || !password){
        return res.status(400).json({
            sucess:false,
            message:"All field are required",
        })
       }
       const isUser=await User.findOne({ $or: [{ email }, { phoneNumber }]}); 
       if(isUser){
       return   res.status(400).json({
            sucess:false,
            message:"Email or Phone Number already exist",
        })
       }   
       const user =await User.create({
        fullName,
        email,
        phoneNumber,
        password,
       })
       const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
return res.status(200).json({
    sucess:true,
    message:"User registered sucessfully",
    createdUser,
})
    }
    catch(error){
        console.log(error)
 return res.status(500).json({

    sucess:false,
    message:"Internal server error",

})
    }

}

//login
const loginUser =async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {phone,password} = req.body
    console.log(phone,password);

    if (!phone) {
        return res.status(400).json({
            success:false,
            message:"Please enter phone and password",
        })
    }
    const user = await User.findOne({phoneNumber:phone})

    if (!user) {
       return res.status(404).json({
        success:false,
        message:"Phone Number does not registered",
       })
    }

   const isPasswordValid = await bcrypt.compare(password,user.password);

   if (!isPasswordValid) {
    return res.status(401).json({
        success:false,
        message:"password is not correct",
    })
    }
    // const accessToken = user.generateAcessToken()
    // const refreshToken = user.generateRefreshToken()
    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })
    console.log("112",accessToken,refreshToken,user)
   // return {accessToken, refreshToken}

   

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
        success: true,
        message: "Login successfully",
        user: loggedInUser,
        accessToken: accessToken,
        refreshToken: refreshToken
    });


}

const logoutUser =async(req, res) => {
    console.log(req.user._id)
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({sucess:true,message:"User logout sucessfully"})
}

const refreshAccessToken =async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

}


const addAddress = async (req, res) => {
    try {
        const { buildingNumber, road, pincode, city } = req.body;

        // Check if all address fields are provided
        if (!buildingNumber || !road || !pincode || !city) {
            return res.status(400).json({
                success: false,
                message: "All address fields are required."
            });
        }

        // Find the user by ID
        const userId = req.user._id; // Assuming req.user contains the logged-in user's information
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Add the new address to the user's addresses array
        user.addresses.push({
            buildingNumber: buildingNumber,
            road: road,
            pincode: pincode,
            city: city
        });

        // Save the user object with the new address
        await user.save();

        return res.status(201).json({
            success: true,
            message: "Address added successfully.",
            address: user.addresses[user.addresses.length - 1] // Return the newly added address
        });

    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

const getProfile=async(req,res)=>{
    try{
        const {id}=req.body
        console.log(id)
        const user=await User.findById(id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:'User is not found'
            })
        }
        return res.status(200).json({
            sucess:true,
            user,
            message:"User details"
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export {
    getProfile,
    register,
    addAddress,
    loginUser,
    generateAccessAndRefereshTokens,
    logoutUser
}
