"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/src/components/ui/button'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'


const HEADER_HEIGHT = "h-16";



const Header = () => {

  const[loggingOut , setIsLoggingOut]=useState(false);

  const logout= async():Promise<void>=>{
   setIsLoggingOut(true);
   await signOut({callbackUrl:"/landingPage?loggedOut=true"}); //sending a query as well so that i can display the toast message on the main page
  
  }
  
  return (
    <>
     <div className="fixed top-0 h-16 w-full bg-black/20 flex justify-between px-3 py-2 text-lg font-bold z-50 backdrop-blur-md border border-2px-solid-white">
        <Link href="#" className="flex items-center gap-2 m-2">
        <Image src="/logo.png" alt="Logo" height={32} width={38} ></Image>
        <h2 className="text-primary-100">InterviewX</h2>
        </Link>
       
      
       
       <Button className="btn-secondary" onClick={logout}>
       
        {
          loggingOut?(
             <>
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
      Logging out...
     </>
     )
     : (
       <>
      <LogOut className="h-4 w-4 mr-2" />
      Logout
     </>
      )

        }
       
        </Button>

    </div>

        {/* Spacer to push content down */}
       <div className={HEADER_HEIGHT} />

    </>
    
  )
}

export default Header
