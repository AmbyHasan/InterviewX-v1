import mongoose ,{Schema , Document  ,Types} from "mongoose";

export interface Interview extends Document{
  _id:Types.ObjectId;
  role: string;
  type: string;
  level: string;
  techstack: string[];
  questions: string[];
  userId: Types.ObjectId | string;
  finalized: boolean;
  coverImage: string;
  amount:number ,
  createdAt :Date;
  updatedAt: Date
}

const InterviewSchema : Schema<Interview>= new Schema({
 role:{
      type:String , 
      required:true 
 } ,
  type: {
      type:String , 
      required:true 
  } ,
  level: {
      type:String , 
      required:true 
  } ,
  techstack:{
      type:[String] ,
      required:true
  } ,
 questions: {
      type:[String] ,
      required:true 
 } ,
 // foreign key reference to User collection
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount:{
  type:Number ,
  required:true
    } ,
 
  finalized: Boolean ,
  coverImage:String ,
} , {timestamps:true});



export default mongoose.models.Interviews ||  mongoose.model("Interviews", InterviewSchema);
