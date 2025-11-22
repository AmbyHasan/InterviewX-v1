import Footer from '@/src/components/ui/Footer'
import Header from '@/src/components/ui/Header'
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'



const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="root-layout">
     <Header/>
      {children}
      <Footer/>
    </div>
  )
}

export default RootLayout
