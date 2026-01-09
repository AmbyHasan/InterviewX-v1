"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { signOut } from 'next-auth/react'

import { DropdownMenu,  DropdownMenuContent,  DropdownMenuItem,  DropdownMenuLabel, DropdownMenuSeparator,DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, LogOut, PenBox, StarsIcon } from 'lucide-react'
const HEADER_HEIGHT = "h-16";


const ToolsHeader = () => {
  
  return (
    <>
     <div className="fixed top-0 h-16 w-full bg-black/20 flex justify-between px-3 py-2 text-lg font-bold z-50 backdrop-blur-md border border-2px-solid-white">


   

        <Link href="#" className="flex items-center gap-2 m-2">
        <Image src="/logo.png" alt="Logo" height={32} width={38} ></Image>
        <h2 className="text-primary-100">InterviewX</h2>
        </Link>


        <div className="gap-2">
           <Link href="/tools-dashboard" >
           <Button className="mr-4 btn-primary">
               <LayoutDashboard className="h-4 w-4"></LayoutDashboard>
                Industry Analytics 
            </Button>
            </Link>

            <DropdownMenu>
   <DropdownMenuTrigger asChild>
    <Button className="btn-primary">
        <StarsIcon className="h-4 w-4"/>
         Career Toolkit
         <ChevronDown className="h-4 w-4"/>
    </Button>
   </DropdownMenuTrigger>
   <DropdownMenuContent>
   
    <DropdownMenuItem>
        <Link href={"tools/resume"} className="flex items-center gap-2">
        <FileText className="w-4 h-4"/>
        Build Resume
        </Link>
    </DropdownMenuItem>

    <DropdownMenuItem>
        <Link href={"tools/ai-cover-letter"} className="flex items-center gap-2">
        <PenBox className="w-4 h-4"/>
        Build Cover Letter
        </Link>
    </DropdownMenuItem>

    <DropdownMenuItem >
        <Link href={"tools/interview-prep"} className="flex items-center gap-2">
        <GraduationCap className="w-4 h-4"/>
        Interview Prep
        </Link>
    </DropdownMenuItem>
  
  </DropdownMenuContent>
</DropdownMenu>
       
       
    

       <Button className="btn-secondary" onClick={()=>signOut({callbackUrl:"/"})}>
        <LogOut className="h-4 w-4" />
        Logout
        </Button>
       </div>

    </div>

        {/* Spacer to push content down */}
       <div className={HEADER_HEIGHT} />

    </>
    
  )
}

export default ToolsHeader;
