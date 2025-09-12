import CategoryProducts from '@/components/CategoryProducts'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import { getCategories } from '@/sanity/lib/products/getAllCategories'
import React from 'react'

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const categories = await getCategories()

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
