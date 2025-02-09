"use client"
import { signOut } from "next-auth/react"
import { useSession } from 'next-auth/react'
import Link from "next/link"

interface NavbarProps {
  smallText: string
  btnText: string
  href: string
}

export default function Navbar({
  smallText,
  btnText,
  href
}: NavbarProps) {
 const { data: session } = useSession()
  
 const signOutFunc = async (e: React.MouseEvent) => {
   e.preventDefault()
   await signOut()
 }

 return (
   <nav className="flex gap-4 sticky top-0 z-40 justify-between py-3 sm:py-4 md:py-6 bg-white text-grey-6">
    <div className="w-16 sm:w-20 md:w-24 h-full bg-blue-700"></div>
    <div className="flex items-center gap-2 sm:gap-3.5">
       <p className="hidden sm:block text-xs sm:text-sm text-gray-600">{smallText}</p>
      {session ? (
        <button
          onClick={signOutFunc}
          className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-blue-500 rounded-md hover:bg-gray-100"
        >
          Sign Out
        </button>
      ) : (
        <Link
          href={href}   
          className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 border rounded-full border-blue-700 hover:border-blue-600 text-blue-700 font-bold hover:text-blue-600"
        >
          {btnText}
        </Link>
      )}
    </div> 
  </nav>
 )
}

