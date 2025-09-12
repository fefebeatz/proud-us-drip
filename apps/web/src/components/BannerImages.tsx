'use client'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { Quote } from 'lucide-react'

type BannerImage = {
  title?: string
  url: string
  description: string
}

const BannerImages = ({ images }: { images: BannerImage[] }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )
  return (
    <div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[plugin.current]}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className='relative'>
                <Image
                  src={image.url}
                  alt={image.description}
                  width={1200}
                  height={800}
                  className='
                w-full 
                h-96           /* mobile : ~384px */
                md:h-[36rem]   /* desktop : ~576px */
                lg:h-[40rem]   /* grands écrans : ~640px */
                object-top 
                object-cover 
                rounded-lg
                shadow-lg
              '
                />

                <div className='absolute inset-0 bg-black/15 rounded-lg'></div>

                {/* Texte superposé */}
                <div
                  className='absolute bottom-3 left-2
                bg-black/80 text-white italic
                text-xs sm:text-sm md:text-base lg:text-lg
                px-2 py-1 rounded'
                >
                  <Quote className='w-4 h-4 md:w-5 md:h-5 inline-block mb-1 mr-1' />
                  {image.description}{' '}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default BannerImages
