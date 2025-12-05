"use client"

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect} from 'react'
// import logo from '../../../public/logo380.svg'      
function Header() {
    const  path=usePathname();
    useEffect(()=>{
        console.log(path)
    })
  return (
    <div className='p-6 px-10 flex justify-between shadow-sm fixed to-0 w-full z-10 bg-white'>
        <div className='flex gap-10 items-center'>

         <img src="/st.png" alt="logo" width={150} height={150} />
       <ul className=' hidden md:flex gap-10'>
        
        <li className={`cursor-pointer font-medium text-sm hover:text-blue-600 hover:scale-105 transition-all duration-200 ${path === '/' ? 'text-blue-600' : ''}`}>
    <Link href="/">For Sale</Link>
  </li>

  <li className="cursor-pointer font-medium text-sm hover:text-blue-600 hover:scale-105 transition-all duration-200">
    <Link href="/rent">For Rent</Link>
  </li>

  <li className="cursor-pointer font-medium text-sm hover:text-blue-600 hover:scale-105 transition-all duration-200">
    <Link href="/agents">Agent Finder</Link>
  </li>

         </ul>
         </div>
         <div className='flex gap-2' >
         
            <Button className="flex gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-5 w-5" /> Post Your Ad
            </Button>
           <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
    Login
  </Button>

         </div>
    </div>
  )
}

export default Header