import Container from '@/components/Container'
import React from 'react'

const page = () => {
  return (
    <Container>
      <h1 className='text-3xl font-bold mb-6 text-dark-color'>
        A propos de Proud Us Drip
      </h1>
      <p className='mb-4 text-dark-color/60'>
        Chez Proud Us Drip , nous croyons que le style est plus qu’une façon de
        s’habiller : c’est une manière de s’affirmer, de revendiquer son
        identité et de refléter sa créativité. Notre marque s’inspire de la
        culture urbaine et des tendances streetwear pour proposer des pièces
        uniques, modernes et accessibles à tous ceux qui veulent exprimer leur
        authenticité.
      </p>
      <div className='mb-4 flex flex-col gap-1'>
        <h3 className='font-semibold text-lg text-dark-color/80'>
          Notre vision
        </h3>
        <p className='text-dark-color/60'>
          Nous voulons dépasser le simple concept de vêtement. Notre objectif
          est de bâtir une communauté où chaque personne peut se reconnaître,
          s’exprimer et s’affirmer avec confiance. Proud Us Drip n’est pas
          seulement une marque : c’est un état d’esprit qui unit ceux qui osent
          être eux-mêmes et qui avancent fièrement avec leur style.
        </p>
      </div>
      <div className='mb-4 flex flex-col gap-1'>
        <h3 className='font-semibold text-lg text-dark-color/80'>
          Nos créations
        </h3>
        <p className='text-dark-color/60'>
          Chaque article est conçu avec soin, en mettant l’accent sur le
          confort, la qualité et le détail. Des essentiels revisités aux pièces
          plus audacieuses, nos collections streetwear s’adressent à tous, qu’il
          s’agisse de looks quotidiens ou de tenues marquées par une touche
          d’originalité. Nous voulons que nos vêtements soient à la fois
          pratiques et inspirants, capables d’accompagner vos journées et vos
          nuits avec style.
        </p>
      </div>
      <div className='mb-4 flex flex-col gap-1'>
        <h3 className='font-semibold text-lg text-dark-color/80'>
          Notre engagement
        </h3>
        <p className='text-dark-color/60'>
          Nous nous engageons à proposer des produits durables et respectueux
          des valeurs de notre communauté. Chez Proud Us Drip , nous travaillons
          pour allier mode, authenticité et responsabilité. Notre démarche vise
          à créer un impact positif, aussi bien dans la rue que dans la vie de
          ceux qui portent nos pièces.
        </p>
      </div>
      <div className='mb-4 flex flex-col gap-1'>
        <h3 className='font-semibold text-lg text-dark-color/80'>
          Rejoignez le mouvement
        </h3>
        <p className='text-dark-color/60'>
          En choisissant Proud Us Drip , vous ne portez pas seulement des
          vêtements : vous portez une identité, une vision et une fierté.
          Rejoignez notre univers et laissez votre style parler pour vous.
        </p>
      </div>
    </Container>
  )
}

export default page
