import mongoose ,{Schema , Document } from "mongoose";
import dbConnect from "../lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/options";


export interface User extends Document{
     name:string ;
     email :string ;
     password?: string; //github and google wont supply a password
     id:string;
createdAt: Date;
  updatedAt: Date;
     
}

const UserSchema : Schema<User>=new mongoose.Schema({
    name:{
        type: String ,
        required:true,
        trim:true,
    } ,
    email:{
        type: String , 
        unique:true ,
        required:true,
         match:[ /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/ , "Please enter a valid email"]
    } ,
    password:{
        type:String ,
        required:false 
    }
} , {timestamps:true})





//next js ko ye nhi pata hota ki ye meri application first time run ho rhi hai ya pehle se boot up hochuki hai
//isiliye while creating UserModel we will first check ki kya ye pehle se bana hua hai  ?? otherwise bana do 

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));

//here above in the first paranthesis we are checking either the User model is already created in db 
export default UserModel;


//for extracting the current user from the sessions
export  async function getCurrentUser(){
    await dbConnect();
    const session=await getServerSession(authOptions);
   const userId = session?.user?._id;
   if (!userId) return null;
    const user = await UserModel.findById(userId).select("-password");
    return user;
       
}