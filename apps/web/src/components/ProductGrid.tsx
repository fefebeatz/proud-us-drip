'use client'
import React, { useEffect, useState } from 'react'
import HomeTabBar from './HomeTabBar'
import ProductCard from './ProductCard'
import NoProductsAvailable from './NoProductsAvailable'
import { Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { getCategories } from '@/sanity/lib/products/getAllCategories'
import { productsByCategory } from '@/sanity/lib/products/getProductByCategory'

export type CategoryProps = {
  _id: string
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
}

export type ProductType = {
  _id: string
  _type: 'product'
  name: string
  category?: {
    _id: string
    _type: 'category'
    title: string
    _ref: string
  }
  slug: {
    _type: 'slug'
    current: string
  }
  color?: {
    _type: 'color'
    hex: string
  }
  colorName?: string
  // sizes?: string[]
  images?: {
    _key: string
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }[]
  price: number
  discount?: number
  stock: number
  status?: 'Nouveau' | 'Hot' | 'Promo' | 'Vedette'
  variant?: string[]
  intro?: string
  description?: string
}

const ProductGrid = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const [selectedTab, setSelectedTab] = useState('')
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(false)

  // Obtention des catégories
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories()
      setCategories(data)
      if (data.length > 0) {
        setSelectedTab(data[0].title)
      }
    }
    fetchCategories()
  }, [])

  // filtrer les articles par catégorie
  useEffect(() => {
    if (!selectedTab) return
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const data = await productsByCategory(selectedTab)
        setProducts(data)
      } catch (error) {
        console.error("Erreur lors de l'obtention des produits triés:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [selectedTab])

  return (
    <div className='mt-5 flex flex-col items-center'>
      <HomeTabBar
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
        categories={categories}
      />

      {/* Affichage des articles */}
      {loading ? (
        <div className='flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10'>
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
            <div className='grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 mt-10 w-full'>
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
            <NoProductsAvailable selectedTab={selectedTab} />
          )}
        </>
      )}
    </div>
  )
}

export default ProductGrid
