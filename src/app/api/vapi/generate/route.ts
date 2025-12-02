import dbConnect from "@/src/lib/dbConnect";
import { getRandomInterviewCover } from "@/src/lib/utils";
import Interview from "@/src/models/Interviews";
import {google} from "@ai-sdk/google";
import { generateText } from 'ai';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";

//api for generating the questions based on the inputs given by the user to vapi

//this post request  will be hit by vapi which will collect the data regarding what type of interview the user wants to appear in
export async function POST(request:Request){

    const {type , role , level , techstack ,amount ,userid }=await request.json();
    console.log("user id is" , userid);
     await dbConnect();
  try {

    const { text: questions } = await generateText({ //we get this function from the ai and over here we have renamed text to questions
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    // Clean AI output
let cleaned = questions.replace(/[\n\r]/g, "").trim();

if (!cleaned.startsWith("[")) cleaned = "[" + cleaned;
if (!cleaned.endsWith("]")) cleaned = cleaned + "]";

let parsedQuestions;
try {
  parsedQuestions = JSON.parse(cleaned);
} catch (e) {
  console.error("Failed to parse questions:", cleaned);
  throw e;
}


    const interview = await Interview.create({
      role: role,
      type: type,
      level: level,
      amount:amount ,
      techstack: techstack.split(",") ,
      questions: parsedQuestions, //the ai will return the questions in string format , we are parsing it into an array
      userId: new mongoose.Types.ObjectId(userid) ,
      finalized: true,
      coverImage: getRandomInterviewCover(), //cover image of the company by which we are getting interviewed ,this function will directly return us the link so we do not need cloudinary or multer
      createdAt: new Date().toISOString(),

  });

   

    return Response.json({ success: true }, { status: 200 });

    
  } catch (error) {
    console.error("Error from vapi:", error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}


export async function GET() {
  await dbConnect();
  const interviews = await Interview.find();
  return Response.json({ success: true }, { status: 200 });
}


