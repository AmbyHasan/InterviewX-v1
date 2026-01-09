"use server"

import { getServerSession } from "next-auth";
import db from "@/src/lib/prisma";
import { authOptions } from '../app/api/auth/[...nextauth]/options';
import { onboardingStatus } from "../types";

export async function updateUser(data : any){
     const session = await getServerSession(authOptions);

       if (!session?.user?._id) {
         throw new Error("Unauthorized");
       
        }

 //mongodb user id from the session
  const authUserId = session.user._id;

  //look for this user id in the neon db
  const user=await db.user.findUnique({
    where:{
        authUserId 
    } ,
  });

   if(!user) throw new Error("User not found in neon db");

    
 //now we will make the connection with the database
   try{
    //since we are using three API's over here therefore we will use transaction of prisma
    const result = await db.$transaction(
  async(tx)=>{


    // FIRST API -> find if the industry exists

    let industryInsight = await tx.industryInsight.findUnique({
        where:{
            industry : data.industry ,
        } ,
    });


    // SECOND API -> if the industry does not exist then we will create it with default values and will replace it with AI later

    if(!industryInsight){
      industryInsight=await tx.industryInsight.create({
        data:{
            industry : data.industry ,
            salaryRanges:[], //default empty array
            growthRate:0, //default value
            demandLevel:"MEDIUM" ,
            topSkills:[] ,
            marketOutlook:"NEUTRAL",
            keyTrends:[] ,
            recommendedSkills:[] ,
            nextUpdate:new Date(Date.now() + 7*24*60*60*1000) , // 1 week


        }
      })
    }

    // Third API -> update the user
  const updatedUser = await tx.user.update({
    where:{
        id:user.id ,
    } ,
    data:{
        industry:data.industry ,
        experience : data.experience  ,
        bio: data.bio ,
        skills : data.skills ,
    } ,
  });

  return {updatedUser, industryInsight}
  } , 
  {
  timeout:10000 , //default :5000
  }
    );

    return {
      success:true ,
      user:result.updatedUser ,
    }

   }catch(error){

console.log("Error updating user and industry:" , error);
throw new Error("Failed to update profile");

   }
}



export async function getUserOnboardingStatus(): Promise<onboardingStatus>{

   const session = await getServerSession(authOptions);

       if (!session?.user?._id) {

       throw new Error("Unauthorized access");
        }


 //mongodb user id from the session
  const authUserId = session.user._id;

  //look for this user id in the neon db
  const user=await db.user.findUnique({
    where:{
        authUserId 
    } ,
  });

   if(!user){
    return {
      isOnboarded : false
    }
   }
  //  if(!user) throw new Error("User not found in neon db");


   try{
    const user=await db.user.findUnique({
    where:{
        authUserId 
    } ,

    select:{
        industry:true ,
    } ,
      
   });
    
   return {
    isOnboarded : !!user?.industry 
   };

}
catch(error){
    console.log("Error checking onboarding status" , error);
    throw new Error("Failed to check onboarding status")
}
}
