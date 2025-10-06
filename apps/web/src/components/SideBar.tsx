import React, { FC } from 'react'
import { motion } from 'motion/react'
import Logo from './Logo'
import Image from 'next/image'
import { X } from 'lucide-react'
import { headerData } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SocialMedia from './SocialMedia'
import { useOutsideClick } from '@/hooks/useOutSideClick'
import { currentUser } from '@clerk/nextjs/server'

interface SideBarProps {
  isOpen: boolean
  onClose: () => void
}

const SideBar: FC<SideBarProps> = async ({ isOpen, onClose }) => {
  const pathname = usePathname()

  const user = await currentUser()

  const role = user!.publicMetadata?.role

  const sideBarRef = useOutsideClick<HTMLDivElement>(onClose)
  return (
    <div
      className={`fixed inset-y-0 left-0 z-100 bg-dark-color/50 shadow-xl hoverEffect w-full ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        ref={sideBarRef}
        className='min-w-72 max-w-96 bg-dark-color h-full text-white/70 p-10 border-r border-r-white flex flex-col gap-6'
      >
        <div className='flex items-center justify-between'>
          <button onClick={onClose}>
            <Logo>
              <Image
                src='/quote.png'
                alt='Proud Us Drip Logo'
                width={60}
                height={50}
                className='object-contain'
              />
            </Logo>
          </button>
          <button className='cursor-pointer' onClick={onClose}>
            <X className='w-6 h-6' />
          </button>
        </div>

        <div className='flex flex-col gap-3.5 text-base font-semibold tracking-wide'>
          {headerData
            .filter((item) => {
              if (
                item.title.toLowerCase() === 'dashboard' &&
                role !== 'admin'
              ) {
                return false
              }
              return true
            })
            .map((item) => (
              <Link
                onClick={onClose}
                href={item.status ? `${item.href}/${item.status}` : item.href}
                key={item.title}
                className={`w-24 hover:text-white hoverEffect relative group ${
                  (pathname === item.href ||
                    pathname === `${item.href}/${item.status}`) &&
                  'text-white'
                }`}
              >
                {item.title}
              </Link>
            ))}
        </div>
        <SocialMedia />
      </motion.div>
    </div>
  )
}

export default SideBar
