'use client'
import { Loader2, Search, SearchIcon, X } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { ProductType } from './ProductGrid'
import { Input } from './ui/input'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import PriceView from './PriceView'
import AddToCardButton from './AddToCardButton'
import { getSearchedProducts } from '@/sanity/lib/products/searchProductsByName'

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  // Récupération des articles par recherche
  const fetchProducts = useCallback(async () => {
    if (!search) {
      setProducts([])
      return
    }
    setLoading(true)
    try {
      const data = await getSearchedProducts(search)
      setProducts(data)
    } catch (error) {
      console.error('Erreur lors de la récupération des articles.', error)
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts()
    }, 300)
    return () => clearTimeout(timer)
  }, [search, fetchProducts])
  return (
    <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>
      <DialogTrigger onClick={() => setShowSearch(!showSearch)}>
        <SearchIcon className='w-5 h-5 hover:text-dark-color hoverEffect cursor-pointer' />
      </DialogTrigger>
      <DialogContent className='max-w-5xl min-h-[90vh] max-h-[90vh] flex flex-col overflow-hidden'>
        <DialogHeader>
          <DialogTitle className='mb-1'>Rechercher un article</DialogTitle>
          <form className='relative' onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder='Rechercher un article ici...'
              type='text'
              className='flex-1 rounded-md py-5'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <X
                className='absolute top-3 right-11 w-4 h-4 cursor-pointer hover:text-red-600 hoverEffect'
                onClick={() => setSearch('')}
              />
            )}
            <button
              type='submit'
              disabled={!search}
              className={`absolute top-0 right-0 cursor-pointer w-10 h-full flex items-center justify-center rounded-tr-md rounded-br-md hover:bg-dark-color hover:text-white hoverEffect ${search ? 'bg-dark-color text-white' : 'bg-dark-color/10'}`}
            >
              <SearchIcon className='w-5 h-5' />
            </button>
          </form>
        </DialogHeader>
        <div className='w-full h-full overflow-y-scroll border border-dark-color/20 rounded-md'>
          <div>
            {loading ? (
              <p className='flex items-center px-6 py-10 gap-1 text-center text-dark-blue'>
                <Loader2 className='w-5 h-5 animate-spin' />
                <span className='text-lg font-semibold'>
                  Recherche en cours...
                </span>
              </p>
            ) : products.length ? (
              <>
                {/* L'article est trouvé */}
                {products.map((product) => (
                  <div
                    key={product._id}
                    className='bg-white overflow-hidden border-b last:border-b-0'
                  >
                    <div className='flex items-center p-1 gap-1'>
                      <Link
                        href={`/article/${product.slug.current}`}
                        className='w-20 h-20 md:w-24 md:h-24 flex-shrink-0 border border-dark-color/20
                        rounded-md overflow-hidden group'
                        onClick={() => setShowSearch(false)}
                      >
                        {product.images && (
                          <Image
                            src={urlFor(product.images[0]).url()}
                            alt={product.name}
                            width={200}
                            height={200}
                            className='w-full h-full object-cover hoverEffect group-hover:scale-110'
                            priority
                          />
                        )}
                      </Link>
                      <div className='px-4 py-2 flex-grow'>
                        <Link
                          href={`/article/${product.slug.current}`}
                          onClick={() => setShowSearch(false)}
                        >
                          <h3 className='text-sm md:text-lg font-semibold text-gray-800 line-clamp-1'>
                            {product.name}
                          </h3>
                          <p className='text-sm text-gray-600 line-clamp-1'>
                            {product.intro
                              ? product.intro
                              : 'Un incontournable à ajouter à votre collection.'}
                          </p>
                        </Link>
                        <PriceView
                          price={product.price}
                          discount={product?.discount}
                        />
                      </div>
                      <div className='w-60 mt-1'>
                        <AddToCardButton product={product} />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className='text-lg text-dark-color/80 px-5 py-10 tracking-wide'>
                {/* Si aucun article n'est trouvé */}
                {search && !loading ? (
                  <p>
                    Désolé, aucun article ne correspond à &laquo;{' '}
                    <span className='font-semibold text-dark-color underline'>
                      {search}
                    </span>{' '}
                    &raquo;. Essayez avec d’autres mots-clés ou découvrez nos
                    catégories populaires.
                  </p>
                ) : (
                  // Initialisation du dialogue recherche
                  <p className='text-dark-blue text-lg px-2'>
                    <span className='flex items-center gap-1'>
                      <Search className='h-4 w-4' />
                      Tapez, trouvez, drippez !
                    </span>
                    <span>
                      Utilisez la recherche pour dénicher la pièce qui fera la
                      différence dans votre style.
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SearchBar
