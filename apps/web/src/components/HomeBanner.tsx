import React from 'react'
import BannerImages from './BannerImages'
import Title from './Title'
import ProductGrid from './ProductGrid'
import { getImagesBanner } from '@/sanity/lib/banner/getBannerImages'
// import { getImagesBannerAction } from '@/sanity/lib/actions'

const HomeBanner = async () => {
  // Obtention des images
  const data = await getImagesBanner()

  return (
    <div className='flex flex-col items-center gap-5'>
      <BannerImages images={data} />

      <Title className='text-3xl md:text-4xl uppercase font-bold text-center'>
        Style urbain. Attitude garantie.
      </Title>
      <p className='text-sm text-center text-light-color/80 font-medium max-w-[480px]'>
        Des pièces streetwear audacieuses, conçues pour te démarquer et vivre
        ton style au quotidien.
      </p>

      {/* Section des produits */}
      <ProductGrid />
    </div>
  )
}

export default HomeBanner
