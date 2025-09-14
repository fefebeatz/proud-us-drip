'use client'
import marketing from '@/images/marketing.png'
import Image from 'next/image'
import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'

const EmptyCart = () => {
  return (
    <div className='py-10 md:py-10 bg-gradient-to-b from-white to-gray-300 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='ng-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-8'
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className='w-48 h-48 mx-auto'
        >
          <Image
            src={marketing}
            alt='Image panier vide'
            className='drop-shadow-lg object-contain'
          />
        </motion.div>

        <div className='text-center space-y-4'>
          <h2 className='text-3xl font-bold text-dark-color'>
            Ton panier est vide...
          </h2>
          <p className='text-gray-600'>
            Ajoute tes pièces préférées et crée ton flow unique avec{' '}
            <span className='font-semibold underline'>Proud Us Drip</span>.
          </p>
        </div>
        <Link
          href='/'
          className='block bg-dark-blue border border-dark-blue text-center rounded-full py-2.5 text-sm font-semibold tracking-wide hover:bg-dark-blue/80 hover:border-dark-blue/80 text-white hoverEffect'
        >
          Découvrez nos artciles
        </Link>
      </motion.div>
    </div>
  )
}

export default EmptyCart
