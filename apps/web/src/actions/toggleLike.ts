"use server"

import { backendClient } from "@/sanity/lib/backenClient"
import { revalidatePath } from "next/cache"

export async function toggleLike(slug: string, articleId: string, userId: string) {
  if (!userId) throw new Error("Utilisateur non authentifié")

  const article = await backendClient.fetch(
    `*[_type == "product" && _id == $articleId][0]{
      _id,
      likes
    }`,
    { articleId }
  )

  const hasLiked = article?.likes?.includes(userId)

  if (hasLiked) {
    // retirer le like
    await backendClient
      .patch(articleId)
      .set({
        likes: article.likes.filter((id: string) => id !== userId),
      })
      .commit()
  } else {
    // ajouter le like
    await backendClient
      .patch(articleId)
      .set({
        likes: [...(article.likes || []), userId],
      })
      .commit()
  }

  // revalider le cache
  revalidatePath(`/article/${slug}`)
}
