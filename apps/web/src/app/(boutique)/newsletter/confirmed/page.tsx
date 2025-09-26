'use client'
import { motion } from 'motion/react'
import { Check, Home } from 'lucide-react'
import Link from 'next/link'

const ConfirmedPage = () => {
  return (
    <div className='py-10 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white rounded-2xl shadow-2xl px-8 py-12 max-w-xl w-full text-center'
      >
        <motion.div className='w-24 h-24 bg-dark-color rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg'>
          <Check className='text-white w-12 h-12' />
        </motion.div>
        <h1 className='text-3xl font-bold text-gray-900 mb-4'>
          Inscription réussie!
        </h1>
        <div className='space-y-4 mb-8 text-left'>
          <p className='text-gray-700'>
            Bienvenue sur Proud Us Drip newsletter ! Votre inscription est
            confirmée. Vous recevrez bientôt nos actualités exclusives, de
            nouveaux contenus et des offres spéciales dans votre boîte de
            réception. Merci pour votre intérêt !
          </p>
        </div>

        <Link
          href='/'
          className='flex items-center justify-center px-4 py-3 font-semibold bg-dark-color text-white rounded-lg 
            hover:bg-gray-800 hoverEffect shadow-md
            '
        >
          <Home className='w-5 h-5 mr-2' /> Accueil
        </Link>
      </motion.div>
    </div>
  )
}

export default ConfirmedPage
