'use client'
import React from 'react'
import Logo from './Logo'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
    <div className='fixed min-h-screen w-full bg-white left-0 top-0 items-center justify-center'>
      <div className='flex flex-col items-center justify-centergap-1'>
        <Logo>
          <Image
            src='/logo.png'
            alt='Proud Us Drip Logo'
            width={80}
            height={30}
            className='object-contain'
          />
        </Logo>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className='flex items-center space-x-2 text-dark-blue'
        >
          <Loader2 className='w-5 h-5 animate-spin' />
          <span className='font-semibold tracking-wide'>
            Proud Us Drip prépare tout pour vous...
          </span>
        </motion.div>
      </div>
    </div>
  )
}

export default Loading
