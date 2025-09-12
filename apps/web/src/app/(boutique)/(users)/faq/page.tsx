import Container from '@/components/Container'
import Title from '@/components/Title'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqData } from '@/constants'
import React from 'react'

const page = () => {
  return (
    <Container className='max-w-4xl sm:px-6 lg:px-8 py-12'>
      <Title className='text-3xl mb-4'>Foire Aux Questions</Title>

      <Accordion
        type='single'
        collapsible
        className='w-full'
        defaultValue='item-0'
      >
        {faqData.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className='group'>
            <AccordionTrigger className='text-left text-lg font-semibold text-dark-color/80 group-hover:text-dark-color hover:no-underline hoverEffect cursor-pointer'>
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className='text-gray-600'>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  )
}

export default page
