import React from 'react'
import Container from './Container'
import FooterTop from './FooterTop'
import SocialMedia from './SocialMedia'
import { Input } from './ui/input'
import { quickLinksData } from '@/constants'
import Link from 'next/link'
import { CategoryProps } from './ProductGrid'
import { getCategories } from '@/sanity/lib/products/getAllCategories'

const Footer = async () => {
  const categories: CategoryProps[] = await getCategories()
  return (
    <footer className='bg-white border-t '>
      <Container>
        <FooterTop />
        <div className='py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='space-y-4'>
            <h3 className='font-semibold text-dark-color mb-4'>
              Proud Us Drip
            </h3>
            <p className='text-sm text-gray-600 mt-4'>
              Proud Us Drip est une marque de streetwear qui allie style,
              authenticité et confiance en soi. Nos collections s’inspirent de
              la culture urbaine pour offrir des pièces modernes, confortables
              et uniques. Les clients peuvent s’attendre à un look affirmé qui
              reflète leur identité et leur énergie.
            </p>
            <SocialMedia
              className='text-dark-color/60'
              iconClassName='hover:text-dark-color'
              tooltipClassName='bg-dark-color text-white'
            />
          </div>
          <div>
            <h3 className='font-semibold text-dark-color mb-4'>
              Liens rapides
            </h3>
            <div className='flex flex-col gap-3'>
              {quickLinksData.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className='text-gray-600 hover:text-dark-color text-sm font-medium hoverEffect'
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className='font-semibold text-dark-color mb-4'>Catégories</h3>
            <div className='flex flex-col gap-3'>
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/categorie/${category.slug.current}`}
                  className='text-gray-600 hover:text-dark-color text-sm font-medium hoverEffect'
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className='font-semibold text-dark-color mb-4'>Newsletter</h3>
            <p className='text-gray-600 text-sm mb-4'>
              Inscris-toi à notre newsletter et sois le premier à découvrir nos
              nouvelles collections, nos drops exclusifs et nos offres
              spéciales. Ne manque aucune vibe streetwear, le style commence
              ici.
            </p>
            <form className='space-y-3'>
              <Input
                type='email'
                placeholder='Votre adresse email'
                required
                className='w-full px-4 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-gray-200'
              />
              <button
                type='submit'
                className='w-full text-white bg-dark-color px-4 py-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer'
              >
                S{"'"}inscrire
              </button>
            </form>
          </div>
        </div>
        <div className='border-t border-white py-8 bg-dark-color'>
          <p className='text-sm text-gray-200 text-center'>
            &copy; 2025,{' '}
            <Link href='/' className='hover:underline'>
              Proud Us Drip
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  )
}
export default Footer
