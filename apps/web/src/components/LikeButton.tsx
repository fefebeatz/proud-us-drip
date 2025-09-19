'use client'

import { useTransition } from 'react'
import { toggleLike } from '@/actions/toggleLike'
import { Heart } from 'lucide-react'

type Props = {
  articleId: string
  slug: string
  userId: string
  likes: string[]
}

export function LikeButton({ slug, articleId, userId, likes }: Props) {
  const [isPending, startTransition] = useTransition()
  const hasLiked = likes.includes(userId)

  const handleClick = () => {
    startTransition(() => {
      toggleLike(slug, articleId, userId)
    })
  }

  return (
    <button
      className='border-2 border-dark-color/30 text-dark-color/60 px-2.5 py-1.5 rounded-md hover:text-dark-color hover:border-dark-color hoverEffect cursor-pointer'
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
