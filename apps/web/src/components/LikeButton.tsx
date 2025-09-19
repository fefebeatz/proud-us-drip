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
  const [isAnimating, setIsAnimating] = useState(false)
  const [localLikes, setLocalLikes] = useState<string[]>(likes)

  const hasLiked = localLikes.includes(userId)

  const handleClick = () => {
    // Déclenche l'animation pop
    setIsAnimating(true)

    // Mise à jour locale pour feedback instantané
    setLocalLikes((prev) =>
      hasLiked ? prev.filter((id) => id !== userId) : [...prev, userId]
    )

    // Toast uniquement si c'est un like
    if (!hasLiked) {
      toast.success('Vous avez aimé cet article !')
    }

    // Appel serveur
    startTransition(() => {
      toggleLike(slug, articleId, userId)
    })
  }

  // Reset l'animation après 300ms
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  return (
    <button
      className={cn(
        'text-dark-color/60 hover:text-dark-color hoverEffect cursor-pointer',
        className
      )}
      onClick={handleClick}
      disabled={isPending && !userId}
    >
      <Heart
        className={cn(
          'transition-transform duration-200 ease-out',
          isAnimating && 'scale-125',
          hasLiked ? 'text-red-500' : 'text-dark-color/60'
        )}
        fill={hasLiked ? 'currentColor' : 'none'}
      />
    </button>
  )
}
