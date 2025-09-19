'use client'

import { useTransition } from 'react'
import { toggleLike } from '@/actions/toggleLike'
import { Heart } from 'lucide-react'
import toast from 'react-hot-toast'

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
      if (hasLiked) {
        toast.success('Article ajouté aux favoris!')
      } else {
        toast.success('Article retiré de vos favoris!')
      }
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
