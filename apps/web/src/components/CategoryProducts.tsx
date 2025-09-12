'use client'
import React, { useEffect, useState } from 'react'
import { CategoryProps, ProductType } from './ProductGrid'
import { Button } from './ui/button'
import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'
import { Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import ProductCard from './ProductCard'
import NoProductsAvailable from './NoProductsAvailable'
import { redirect } from 'next/navigation'

interface Props {
  categories: CategoryProps[]
  slug: string
}

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchProductsByCategory = async (categorySlug: string) => {
    setLoading(true)
    try {
      const query = `*[_type == "product" && references(*[_type=="category" && slug.current == $categorySlug]._id)] | order(name asc)`
      const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(query)
      const products = await sanityFetch({
        query: PRODUCTS_BY_CATEGORY_QUERY,
        params: { categorySlug },
      })
      return products.data || []
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error)
      return []
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      const filteredProducts = await fetchProductsByCategory(currentSlug)
      setProducts(filteredProducts)
    }

    getProducts()
  }, [currentSlug])

  return (
    <div className='py-5 flex flex-col md:flex-row items-start gap-5'>
      <div className='flex flex-col md:min-w-40 border'>
        {categories.map((category) => (
          <Button
            key={category._id}
            className={`bg-transparent border-0 rounded-none text-dark-color shadow-none hover:bg-dark-color/80 hover:text-white        font-semibold hoverEffect border-b last:border-b-0 cursor-pointer ${currentSlug === category.slug.current && 'text-white bg-dark-color border-dark-color'}`}
            onClick={() => {
              setCurrentSlug(category.slug.current as string)
              redirect(`/categorie/${category.slug.current}`)
            }}
          >
            {category.title}
          </Button>
        ))}
      </div>
      <div className='w-full'>
        {loading ? (
          <div className='flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full'>
            <div className='flex items-center space-x-2 text-dark-blue'>
              <Loader2 className='animate-spin' />
              <span className='text-lg font-semibold'>
                Chargement en cours...
              </span>
            </div>
          </div>
        ) : (
          <>
            {products.length ? (
              <div className='grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 w-full'>
                {products.map((product: ProductType) => (
                  <AnimatePresence key={product._id}>
                    <motion.div
                      layout
                      initial={{ opacity: 0.2 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  </AnimatePresence>
                ))}
              </div>
            ) : (
              <NoProductsAvailable selectedTab={currentSlug} className='mt-0' />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CategoryProducts
