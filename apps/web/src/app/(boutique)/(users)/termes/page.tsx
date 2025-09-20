import Container from '@/components/Container'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Termes & conditions',
}

const page = () => {
  return (
    <Container className='max-w-3xl sm:px-6 lg:px-8 py-12'>
      <h1 className='text-3xl font-bold mb-6'>Termes & conditions</h1>
      <div className='space-y-4'>
        <section>
          <h2 className='text-xl font-semibold mb-2'>
            1. Acceptation des termes
          </h2>
          <p>
            En naviguant sur notre site, en créant un compte ou en réalisant un
            achat, vous confirmez avoir lu, compris et accepté les présentes{' '}
            <span className='font-semibold underline'>
              Conditions Générales d’Utilisation
            </span>{' '}
            et de Vente. Si vous n’êtes pas d’accord avec tout ou partie de ces
            termes, nous vous invitons à ne pas utiliser nos services.
          </p>
        </section>
        <section>
          <h2 className='text-xl font-semibold mb-2'>
            2. Utilisation du service
          </h2>
          <p>
            Nos services sont destinés exclusivement à un usage personnel et non
            commercial. Vous vous engagez à :
          </p>
          <ul>
            <li className='list-disc list-inside'>
              Fournir des informations exactes et complètes lors de la création
              d’un compte ou d’une commande.
            </li>
            <li className='list-disc list-inside'>
              Ne pas utiliser le site à des fins frauduleuses, abusives ou
              contraires à la loi.
            </li>
            <li className='list-disc list-inside'>
              Respecter les délais et modalités de paiement indiqués lors de vos
              achats.
            </li>
          </ul>
          <p>
            Nous nous réservons le droit de suspendre ou de supprimer tout
            compte en cas d’utilisation non conforme.
          </p>
        </section>
        <section>
          <h2 className='text-xl font-semibold mb-2'>
            3. Propriété intellectuelle
          </h2>
          <p>
            L’ensemble des contenus présents sur le site Proud Us Drip (textes,
            visuels, logos, graphismes, photographies, vidéos, etc.) est protégé
            par le droit d’auteur et reste la propriété exclusive de Proud Us
            Drip ou de ses partenaires. <br />
            Toute reproduction, modification ou exploitation non autorisée,
            totale ou partielle, est strictement interdite et pourra donner lieu
            à des poursuites judiciaires.
          </p>
        </section>
        <section>
          <h2 className='text-xl font-semibold mb-2'>
            4. Limitation de responsabilité
          </h2>
          <p>
            Bien que nous mettions tout en œuvre pour garantir la fiabilité et
            la qualité de nos produits et services :
          </p>
          <ul>
            <li className='list-disc list-inside'>
              <span className='font-semibold'>Proud Us Drip</span> ne pourra
              être tenu responsable des dommages indirects, pertes de données,
              pertes de revenus ou toute conséquence liée à l’utilisation du
              site ou à l’impossibilité d’y accéder.
            </li>
            <li className='list-disc list-inside'>
              La responsabilité de{' '}
              <span className='font-semibold'>Proud Us Drip</span> est limitée
              au montant de la commande concernée.
            </li>
          </ul>
        </section>
        <section>
          <h2 className='text-xl font-semibold mb-2'>5. Droit applicable</h2>
          <p>
            Les présentes{' '}
            <span className='font-semibold underline'>
              Conditions Générales
            </span>{' '}
            sont régies et interprétées conformément au droit en vigueur dans le
            pays où est établi{' '}
            <span className='font-semibold'>Proud Us Drip</span>. En cas de
            litige, et à défaut de résolution amiable, les tribunaux compétents
            du ressort géographique de l’entreprise seront seuls habilités à
            statuer.
          </p>
        </section>
      </div>
    </Container>
  )
}

export default page
