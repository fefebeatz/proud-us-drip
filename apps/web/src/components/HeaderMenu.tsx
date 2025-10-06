'use client'

import { headerData } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useUser } from '@clerk/nextjs'

const HeaderMenu = () => {
  const pathname = usePathname()
  const { user } = useUser()

  // Rôle actuel (si connecté)
  const role = user?.publicMetadata?.role

  return (
    <div className='hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold'>
      {headerData
        .filter((item) => {
          if (item.title.toLowerCase() === 'dashboard' && role !== 'admin') {
            return false
          }
          return true
        })
        .map((item) => (
          <Link
            href={item.status ? `${item.href}/${item.status}` : item.href}
            key={item.title}
            className={`hover:text-dark-color hoverEffect relative group ${
              (pathname === item.href ||
                pathname === `${item.href}/${item.status}`) &&
              'text-dark-color'
            }`}
          >
            {item.title}
            <span
              className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-dark-color hoverEffect group-hover:w-1/2 group-hover:left-0 ${
                (pathname === item.href ||
                  pathname === `${item.href}/${item.status}`) &&
                'w-1/2'
              }`}
            />
            <span
              className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-dark-color hoverEffect group-hover:w-1/2 group-hover:right-0 ${
                (pathname === item.href ||
                  pathname === `${item.href}/${item.status}`) &&
                'w-1/2'
              }`}
            />
          </Link>
        ))}
    </div>
  )
}

export default HeaderMenu
