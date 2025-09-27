'use client'

import { useState } from 'react'
import { Input } from './ui/input'
import toast from 'react-hot-toast'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message || "Erreur lors de l'inscription")
      } else {
        toast.success(data.message || 'Inscription réussie !')
        setEmail('') // reset input si succès
      }
    } catch (err) {
      toast.error('Erreur réseau. Réessaie plus tard.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <Input
        type='email'
        placeholder='Votre adresse email'
        required
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-gray-200'
      />
      <button
        type='submit'
        disabled={loading}
        className='w-full text-white bg-dark-color px-4 py-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer'
      >
        {loading ? 'Inscription en cours...' : `S'inscrire`}
      </button>
    </form>
  )
}
