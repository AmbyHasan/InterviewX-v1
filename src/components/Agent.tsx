"use client";

import Image from 'next/image'
import { useEffect, useState } from 'react';
import { AgentProps } from '../types';
import { useRouter } from 'next/router';
import {vapi} from "@/lib/vapi.sdk"


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


const Agent = ({userName ,userId ,type}:AgentProps) => {

  const router=useRouter();
  const [isSpeaking ,setIsSpeaking]=useState(false);
  const [callStatus , setCallStatus]=useState<CallStatus>(CallStatus.INACTIVE);
  const [messages , setMessages]=useState<SavedMessage[]>([]);

  useEffect(()=>{
    const onCallStart=()=>setCallStatus(CallStatus.ACTIVE);
    const onCallEnd=()=>setCallStatus(CallStatus.FINISHED);


    const onMessage=(message:Message)=>{
      if(message.type==="transcript" && message.transcriptType==="final"){
        const newMessage={role:message.role  , content: message.transcript}

        setMessages((prev)=> [...prev ,  newMessage]);

      }
    }

    const onSpeechStart=()=>setIsSpeaking(true);
    const onSpeechEnd=()=>setIsSpeaking(false);

    const onError=(error : Error)=> console.log("Error" , error)

    vapi.on("call-start" , onCallStart);
    vapi.on("call-end" ,onCallEnd);
    vapi.on("message" ,onMessage);
    vapi.on("speech-end" ,onSpeechEnd);
    vapi.on("error" , onError );

    return ()=>{
    vapi.off("call-start" , onCallStart);
    vapi.off("call-end" ,onCallEnd);
    vapi.off("message" ,onMessage);
    vapi.off("speech-end" ,onSpeechEnd);
    vapi.off("error" , onError );
    }
  } ,[])

  useEffect(()=>{
      if(callStatus==CallStatus.FINISHED) router.push("/");
  } ,[messages ,callStatus , type , userId]);


  const handleCall=async()=>{
    setCallStatus(CallStatus.CONNECTING);

  }



  
  const lastMessage=messages[messages.length-1];

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
          <h3>You{userName}</h3>
        </div>
         </div>
    
         
          
      {messages.length > 0 && (
  <div className="transcript-border w-[70%] m-2">
    <div className="transcript w-full">
      <p
        key={lastMessage}
        className="animate-fadeIn transition-opacity duration-500"
      >
        {lastMessage}
      </p>
    </div>
  </div>
  
)}


       {callStatus !== CallStatus.ACTIVE ? (
     <button className="relative btn-call">
      <span>
        {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED ? "Call" : "..."}
      </span>
     </button>   
       ):( 
        <button className="btn-disconnect">END</button>
       )}

      
  </div>
  </> 
  )
};

export default Agent;
