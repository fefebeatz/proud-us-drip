'use client'

import { useState } from 'react'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()
    setMessage(data.message)
    setLoading(false)
  }

  return (
    <form className='space-y-3'>
      <Input
        type='email'
        placeholder='Votre adresse email'
        required
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full px-4 py-2 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-gray-200'
        onSubmit={handleSubmit}
      />
      <button
        type='submit'
        disabled={loading}
        className='w-full text-white bg-dark-color px-4 py-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer'
      >
        {loading ? 'Inscription en cours...' : `S${"'"}inscrire`}
      </button>
      {message && (
        <p
          className={cn('text-sm text-white font-semibold', {
            'bg-red-400': message.includes('Erreur'),
            'bg-dark-color': !message.includes('Erreur'),
          })}
        >
          {message}
        </p>
      )}
    </form>
  )
}
