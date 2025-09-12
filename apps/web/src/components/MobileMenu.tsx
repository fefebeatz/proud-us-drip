'use client'
import { AlignLeft } from 'lucide-react'
import React, { useState } from 'react'
import SideBar from './SideBar'

const MobileMenu = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
        <AlignLeft className='w-5 h-5 hover:text-dark-color hoverEffect md:hidden cursor-pointer' />
      </button>
      <div className='md:hidden'>
        <SideBar
          isOpen={isSideBarOpen}
          onClose={() => setIsSideBarOpen(false)}
        />
      </div>
    </>
  )
}

export default MobileMenu
