"use client";

import Image from 'next/image'
import { useEffect, useState } from 'react';
import { AgentProps } from '../types';
import { useRouter } from 'next/navigation';
import { vapi } from '../lib/vapi';
import { cn } from '../lib/utils';
import { interviewer } from '../constants';



enum CallStatus{
  INACTIVE="INACTIVE" ,
  CONNECTING="CONNECTING" ,
  ACTIVE="ACTIVE",
  FINISHED="FINISHED"
}

interface SavedMessage{
  role:"user" | "system" | "assistant";
  content:string
}




const Agent = ({userName ,userId ,type ,interviewId ,questions}:AgentProps) => {

  const router=useRouter();
  const [isSpeaking ,setIsSpeaking]=useState(false);
  const [callStatus , setCallStatus]=useState<CallStatus>(CallStatus.INACTIVE);
  const [messages , setMessages]=useState<SavedMessage[]>([]);
  
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  useEffect(()=>{

    const onCallStart=()=>setCallStatus(CallStatus.ACTIVE); //what happens when call starts
    const onCallEnd=()=>setCallStatus(CallStatus.FINISHED);  //what happens when call ends


    const onMessage=(message:Message)=>{
      if(message.type==="transcript" && message.transcriptType==="final"){  // we can save it some more
        const newMessage={role:message.role  , content: message.transcript}

         setMessages((prev)=> [...prev ,  newMessage]); //spread the previous message and append the new message

      }
    }

    const onSpeechStart=()=>setIsSpeaking(true);
    const onSpeechEnd=()=>setIsSpeaking(false);

    const onError=(error : Error)=> console.log("Error" , error)

    vapi.on("call-start" , onCallStart);
    vapi.on("call-end" ,onCallEnd);
    vapi.on("message" ,onMessage);
    vapi.on("speech-start" ,onSpeechStart);
    vapi.on("speech-end" ,onSpeechEnd);
    vapi.on("error" , onError );

    //clean up function
    return ()=>{ //closing all the listeners on unmount
    vapi.off("call-start" , onCallStart);
    vapi.off("call-end" ,onCallEnd);
    vapi.off("message" ,onMessage);
    vapi.off("speech-start" ,onSpeechStart);
    vapi.off("speech-end" ,onSpeechEnd);
    vapi.off("error" , onError );
    }
  } ,[])
  
      
//------------------------------------------------------------------------------------------------------------------------------------------------
  const handleGenerateFeedback=async(messages:SavedMessage[])=>{
      console.log("Generate Feedback here");

       //mock message
      const {success , id}={
        success:true ,
        id: "feedback-id"

      }

      if(success && id){
          router.push(`/interview/${interviewId}/feedback`)
      }else{
        console.log("Error saving feedback");
        router.push("/");
      }
  }

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------

 //after the call ends take the user back to the home page so that they can see their fully generated interview
  useEffect(()=>{
      if(callStatus===CallStatus.FINISHED){
        //generate the interview and push the user to the home page
        if(type==="generate"){
          router.push('/');
        }else{
          handleGenerateFeedback(messages);
        }
      }
     
  } ,[messages ,callStatus , type , userId]);

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------

   //start the call function
  const handleCall=async()=>{


    setCallStatus(CallStatus.CONNECTING);

    console.log("Sending to VAPI:", {
   username: userName,
     userid: userId
    });


   if(type==="generate"){
       await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID ,{
       variableValues:{
       username:userName,
       userid:userId
       }
    });
   }else{

    //we will provide the array of questions for the interviewer to ask
    let formattedQuestions="";

    if(questions){

       formattedQuestions=questions.map((question)=>`-${question}`).join('\n');
         }
    
    await vapi.start(interviewer ,{
      variableValues:{
      questions:formattedQuestions
      }
    })
    


   }

    
    
  }
 
  //dissconnecting the call
  const handleDisconnect=async()=>{
   setCallStatus(CallStatus.FINISHED);
   vapi.stop();
  }
  
  const latestMessage=messages[messages.length-1]?.content;
  const isCallInactiveOrFinished= callStatus===CallStatus.INACTIVE || callStatus===CallStatus.FINISHED;

  return (
  <>  
  <div className="flex flex-col justify-center items-center w-full ">
    <div className="flex gap-4 m-4 w-[70%] items-center">
        <div className="card-interviewer ">
            <div className="relative flex items-center justify-center">
              <Image src="/ai-avatar.png" alt="vapi" width={200} height={200} className="object-cover rounded-full"/>
                {isSpeaking && <span className="animate-speak"/>}
            </div>
            <h3>AI Interviewer</h3>
        </div>
        <div className="card-interviewer">
          <div className="relative flex items-center justify-center">
          <Image src="/user-avatar.png" alt="user avatar" width={200} height={200}className="object-cover rounded-full" />
          {isSpeaking && <span className="animate-speak"/>}
          </div>
          <h3>{userName}</h3>
        </div>
         </div>
    
         
          
      {messages.length > 0 && (
  <div className="transcript-border w-[70%] m-2">
    <div className="transcript w-full">
      <p
        key={latestMessage}
        className="animate-fadeIn transition-opacity duration-500"
      >
        {latestMessage}
      </p>
    </div>
  </div>
  
)}


       {callStatus !== CallStatus.ACTIVE ? (
     <button className="relative btn-call" onClick={handleCall}>
      <span className={cn('absolute animate-ping rounded-full opacity-75' , callStatus!=='CONNECTING' && 'hidden')}/>
      <span>
    {isCallInactiveOrFinished ? 'Call' : '...'}
     </span>
     </button>   
       ):( 
        <button className="btn-disconnect" onClick={handleDisconnect}>END</button>
       )}

      
  </div>
  </> 
  )
};

export default Agent;
