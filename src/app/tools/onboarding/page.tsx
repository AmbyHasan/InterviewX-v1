import React from 'react'
import ToolsHeader from '@/src/components/ui/ToolsHeader'
import Footer from '@/src/components/ui/Footer'
import OnboardingForm from '@/src/components/OnboardingForm'
import { getUserOnboardingStatus } from '@/src/actions/user'
import { redirect } from 'next/navigation'
import { checkUser } from '@/src/lib/checkUser'


const page = async() => {

  await checkUser();

//check if the user if already onboarded
const {isOnboarded}= await getUserOnboardingStatus();

if(isOnboarded){
  redirect("/tools/dashboard");
}


  return (
   <>
   <ToolsHeader/>
     
      
      <OnboardingForm/>
    
  <Footer/>
    
  </>
    
  )
}

export default page
