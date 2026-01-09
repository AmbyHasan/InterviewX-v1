import React from 'react'
import ToolsHeader from '@/src/components/ui/ToolsHeader'
import Footer from '@/src/components/ui/Footer'
import { checkUser } from '@/src/lib/checkUser'

const page = async() => {
  await checkUser();
  return (
   <>
     <ToolsHeader/>

     

     <Footer/>
    
  </>
    
  )
}

export default page
