'use client'

import { useTransition, useState, useEffect } from 'react'
import { toggleLike } from '@/actions/toggleLike'
import { Heart } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'

type Props = {
  articleId: string
  slug: string
  userId: string
  likes: string[]
  className?: string
}

export function LikeButton({
  slug,
  articleId,
  userId,
  likes,
  className,
}: Props) {
  const [isPending, startTransition] = useTransition()
  const [isBouncing, setIsBouncing] = useState(false)
  const [localLikes, setLocalLikes] = useState<string[]>(likes)

  const hasLiked = localLikes.includes(userId)

  const handleClick = () => {
    // Déclenche l'animation bounce
    setIsBouncing(true)

    // Met à jour le like localement pour un feedback instantané
    setLocalLikes((prev) =>
      hasLiked ? prev.filter((id) => id !== userId) : [...prev, userId]
    )

    // Si on vient de liker, on affiche le toast
    if (!hasLiked) {
      toast.success('Vous avez aimé cet article !')
    }

    startTransition(() => {
      toggleLike(slug, articleId, userId)
    })
  }

  // Reset l'animation après 500ms
  useEffect(() => {
    if (isBouncing) {
      const timer = setTimeout(() => setIsBouncing(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isBouncing])

  return (
    <button
      className={cn(
        'text-dark-color/60 hover:text-dark-color hoverEffect cursor-pointer',
        className
      )}
      onClick={handleClick}
      disabled={isPending}
    >
      <Heart
        className={cn(
          'transition-colors duration-200',
          isBouncing && 'animate-bounce',
          hasLiked ? 'text-red-500' : 'text-dark-color/60'
        )}
        fill={hasLiked ? 'currentColor' : 'none'}
      />
    </button>
  )
}
