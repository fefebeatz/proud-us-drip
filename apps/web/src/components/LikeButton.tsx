'use client'

import { useTransition } from 'react'
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
  const hasLiked = likes.includes(userId)

  const handleClick = () => {
    startTransition(() => {
      toggleLike(slug, articleId, userId)
    })

    if (hasLiked) {
      toast.success('Article ajouté aux favoris.')
    } else {
      toast.success('Article retiré de vos favoris.')
    }
  }

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
        className={`transition-colors duration-200 ${
          hasLiked ? 'text-red-500' : 'text-dark-color/60'
        }`}
        fill={hasLiked ? 'currentColor' : 'none'}
      />
    </button>
  )
}
