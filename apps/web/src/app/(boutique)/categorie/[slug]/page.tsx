import CategoryProducts from '@/components/CategoryProducts'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import { CategoryProps } from '@/components/ProductGrid'
import { getCategories } from '@/sanity/lib/products/getAllCategories'
import { notFound } from 'next/navigation'
import React from 'react'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const categoryLabel = slug.charAt(0).toUpperCase() + slug.slice(1)

  return {
    title: `Articles de la catégorie ${categoryLabel}`,
    description: `Découvrez les articles de la catégorie "${categoryLabel}" sur Proud Us Drip.`,
    openGraph: {
      title: `${categoryLabel} | Proud Us Drip`,
      description: `Parcourez tous les articles liés à la catégorie "${categoryLabel}".`,
      url: `https://proud-us-drip.vercel.app/categorie/${slug}`,
      siteName: 'Proud Us Drip',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryLabel} | Proud Us Drip`,
      description: `Articles de la catégorie "${categoryLabel}" disponibles sur Proud Us Drip.`,
    },
  }
}

export async function generateStaticParams() {
  const categories: CategoryProps[] = await getCategories()
  return categories.map(({ slug }) => slug.current).slice(0, 5)
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const categories: CategoryProps[] = await getCategories()

  // Vérifie si la catégorie existe
  const categoryExists = categories.some((cat) => cat.slug.current === slug)
  if (!categoryExists) {
    return notFound()
  }

  return (
    <Container className='py-10'>
      <Logo className='text-xl cursor-text'>
        Articles triés par catégorie:{' '}
        <span className='font-bold text-dark-blue capitalize tracking-wide'>
          {slug && slug}
        </span>
      </Logo>

      {/* Afficher les articles triés */}
      <CategoryProducts categories={categories} slug={slug} />
    </Container>
  )
}

export default page
