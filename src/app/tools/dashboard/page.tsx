import { getUserOnboardingStatus } from '@/src/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'



const page = async() => {

  const { isOnboarded}  = await getUserOnboardingStatus();

  //if the user is not on boarded then push it to on boarding page
if(!isOnboarded){
  redirect("/tools/onboarding")
}
  return (
    <div>
      tools wala dashboard yani industry insights page
    </div>
  )
}

export default page
