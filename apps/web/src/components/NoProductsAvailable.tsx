import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface Props {
  selectedTab: string
  className?: string
}

const NoProductsAvailable = ({ selectedTab, className }: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10',
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='text-2xl font-bold text-gray-800'>
          Aucun article n{"'"}est disponible pour cette catégorie.
        </h2>
      </motion.div>
      <motion.p
        className='text-gray-600 px-2'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Nous sommes désolés, mais aucun article n{"'"}est disponible pour{' '}
        <span className='text-base font-semibold text-dark-color'>
          {selectedTab}
        </span>{' '}
        pour le moment.
      </motion.p>
      <motion.div
        className='flex items-center space-x-2 text-dark-blue'
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Loader2 className='w-4 h-4 animate-spin' />{' '}
        <span>Les articles seront disponibles d{"'"}ici peu.</span>
      </motion.div>
      <motion.p
        className='text-sm text-gray-600'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        N{"'"}hésitez pas à consulter les articles d{"'"}autres catégories.
      </motion.p>
    </div>
  )
}

export default NoProductsAvailable
