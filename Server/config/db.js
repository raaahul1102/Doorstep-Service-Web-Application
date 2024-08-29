import mongoose from "mongoose";

const db=async()=>{
    try{
       const connection= await mongoose.connect(process.env.MONGO_URI)
        console.log("MonoDb connected")
      // console.log(connection)
    }
    catch(error){
        console.log("Mongodb connection error",error)
    }
}
export default db;
