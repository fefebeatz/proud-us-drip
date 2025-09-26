'use client'
import { useCarStore } from '@/store'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'motion/react'
import { Check, Home, Package, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

const SuccessPage = () => {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('orderNumber')
  const sessionID = searchParams.get('session_id')
  const router = useRouter()
  const { resetCard } = useCarStore()

  useEffect(() => {
    if (!orderNumber && !sessionID) {
      router.push('/')
    } else {
      resetCard()
    }
  }, [orderNumber, sessionID, resetCard])
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
          Paiement validé!
        </h1>
        <div className='space-y-4 mb-8 text-left'>
          <p className='text-gray-700'>
            Votre commande n°{' '}
            <span className='text-dark-blue font-bold'>{orderNumber}</span> est
            confirmée et nous allons la préparer avec soin. Vous recevrez un
            email de confirmation contenant tous les détails.
          </p>
        </div>
        <div className='bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8'>
          <h2 className='font-semibold text-gray-900 mb-2'>
            La prochaine étape
          </h2>
          <ul className='text-gray-700 text-sm space-y-1'>
            <li>Consultez vos mails pour confirmation</li>
            <li>Nous vous informerons lorsque votre commande sera expédiée.</li>
            <li>Consultez le statut de votre commande à tout moment.</li>
          </ul>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
          <Link
            href='/'
            className='flex items-center justify-center px-4 py-3 font-semibold bg-dark-color text-white rounded-lg 
            hover:bg-gray-800 hoverEffect shadow-md
            '
          >
            <Home className='w-5 h-5 mr-2' /> Accueil
          </Link>
          <Link
            href='/commandes'
            className='flex items-center justify-center px-4 py-3 font-semibold bg-white text-dark-color border border-dark-color rounded-lg 
            hover:bg-gray-100 hoverEffect shadow-md
            '
          >
            <Package className='w-5 h-5 mr-2' /> Commandes
          </Link>
          <Link
            href='/panier'
            className='flex items-center justify-center px-4 py-3 font-semibold bg-dark-color text-white rounded-lg 
            hover:bg-gray-800 hoverEffect shadow-md
            '
          >
            <ShoppingBag className='w-5 h-5 mr-2' /> Panier
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default SuccessPage
