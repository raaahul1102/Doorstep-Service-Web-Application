import mongoose from "mongoose";
import bcrypt from "bcrypt"
import  Jwt  from "jsonwebtoken"
const addressSchema = new mongoose.Schema({
    buildingNumber: { type: String },
    road: { type: String },
    pincode: { type: String },
    city: { type: String }
});
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, maxlength: 50 },
    
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phoneNumber: { type: String, maxlength: 15 },
    password: { type: String, required: true },
    refreshToken:{
        type:String,
    },
    addresses: [addressSchema]
    ,
    paymentInformation: { type: String },
    profilePicture: { type: String },
    role: { type: String, enum: ['Customer', 'Service Provider', 'Admin'],default:'Customer'},
},{timestamps:true});

userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        return next()
    }
    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.generateAccessToken=async function(){
    return  Jwt.sign({
         _id:this._id,
         email:this.email,                
         fullName:this.fullName,
  
         
      },
          process.env.ACCESS_TOKEN_SECREAT,
          {
              expiresIn:process.env.ACCESS_TOKEN_EXPIRY
          }
      )
  }

  
  userSchema.methods.generateRefreshToken=async function(){
      return  Jwt.sign({
          _id:this._id,
       },
           process.env.REFRESH_TOKEN_SECRET,
           {
               expiresIn:process.env.REFRESH_TOKEN_EXPIRY
           }
       )
  }
export const User = mongoose.model('User', userSchema);

//module.exports = User;
// export{
//     generateAcessToken,
//     generateRefreshToken
// }
