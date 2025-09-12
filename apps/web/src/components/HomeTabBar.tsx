import { Repeat } from 'lucide-react'
import React from 'react'

type CategoryProps = {
  title: string
}

interface Props {
  selectedTab: string
  onTabSelect: (tab: string) => void
  categories: CategoryProps[]
}

const HomeTabBar = ({ selectedTab, onTabSelect, categories }: Props) => {
  return (
    <div className='flex items-center gap-1.5 text-sm font-semibold'>
      <div className='flex items-center gap-1.5'>
        {categories.map((category: CategoryProps, index: number) => (
          <button
            key={index}
            onClick={() => onTabSelect(category.title)}
            className={`border border-dark-color px-4 py-1.5 md:px-6 md:py-2 rounded-full transition-colors hover:bg-dark-color hover:text-white cursor-pointer hoverEffect ${selectedTab === category.title && 'bg-dark-color text-white'}`}
          >
            {category.title}
          </button>
        ))}
      </div>
      <div
        className='tooltip'
        data-tip='Choisissez une catégorie aléatoirement'
      >
        <button
          className='border border-dark-color p-2 rounded-full transition-colors hover:bg-dark-color hover:text-white cursor-pointer hoverEffect'
          onClick={() => {
            // const randomIndex = Math.floor(Math.random() * categories.length)
            // onTabSelect(categories[randomIndex].title)
          }}
        >
          <Repeat className='h-5 w-5' />
        </button>
      </div>
    </div>
  )
}

export default HomeTabBar
