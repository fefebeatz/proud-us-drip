'use client'

import Container from '@/components/Container'
import { motion } from 'motion/react'

export default function NotFound() {
  return (
    <Container>
      <div className='flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-3xl font-bold text-gray-800'>404</h2>
        </motion.div>

        <motion.p
          className='text-gray-600 px-2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Nous sommes désolés, mais aucun article n&apos;a été trouvé.
        </motion.p>

        <motion.p
          className='text-sm text-gray-600'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          N&apos;hésitez pas à consulter la liste des articles disponibles.
        </motion.p>
      </div>
    </Container>
  )
}
