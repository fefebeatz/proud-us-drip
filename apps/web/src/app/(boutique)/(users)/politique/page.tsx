import Container from '@/components/Container'
import React from 'react'

const page = () => {
  return (
    <Container className='max-w-3xl sm:px-6 lg:px-8 py-12'>
      <h1 className='text-3xl font-bold mb-6'>Politique de Confidentialité</h1>
      <p className='mb-4'>
        Chez <span className='font-semibold'>Proud Us Drip</span>, la protection
        de vos données personnelles est une priorité. Cette politique explique
        comment nous collectons, utilisons, partageons et protégeons vos
        informations lorsque vous utilisez notre site et nos services.
      </p>
      <div className='space-y-4'>
        <section>
          <h2 className='text-xl font-semibold mb-2'>
            1. Collecte des informations
          </h2>
          <p>
            Lorsque vous naviguez sur notre site ou effectuez un achat, nous
            pouvons collecter les informations suivantes :
          </p>
          <ul>
            <li className='list-disc list-inside'>
              Données personnelles fournies lors de la création de compte (nom,
              prénom, adresse e-mail, adresse postale, numéro de téléphone).
            </li>
            <li className='list-disc list-inside'>
              Informations de paiement lors de vos commandes (traitées via des
              prestataires sécurisés, nous ne stockons pas vos données
              bancaires).
            </li>
            <li className='list-disc list-inside'>
              Données de navigation (adresse IP, type de navigateur, pages
              consultées, cookies).
            </li>
          </ul>
        </section>
        <section>
          <h2 className='text-xl font-semibold mb-2'>
            2. Utilisation des informations
          </h2>
          <p>Les informations collectées nous permettent de :</p>
          <ul>
            <li className='list-disc list-inside'>
              Traiter vos commandes et assurer leur livraison.
            </li>
            <li className='list-disc list-inside'>
              Gérer votre compte client et vous offrir une expérience
              personnalisée.
            </li>
            <li className='list-disc list-inside'>
              Vous informer de nos nouveautés, promotions et mises à jour (si
              vous y avez consenti).
            </li>
            <li className='list-disc list-inside'>
              Améliorer nos services et sécuriser notre plateforme.
            </li>
          </ul>
        </section>
        <section>
          <h2 className='text-xl font-semibold mb-2'>
            3. Partage des informations
          </h2>
          <p>
            Nous ne vendons ni ne louons vos données personnelles à des tiers.
            Toutefois, vos informations peuvent être partagées avec :
          </p>
          <ul>
            <li className='list-disc list-inside'>
              Nos prestataires de services (ex. : livraison, paiement sécurisé).
            </li>
            <li className='list-disc list-inside'>
              Les autorités légales si la loi nous y oblige ou en cas de litige.
            </li>
          </ul>
          <p>
            Chaque partenaire est tenu de respecter la confidentialité et la
            sécurité de vos données.
          </p>
        </section>
        <section>
          <h2 className='text-xl font-semibold mb-2'>
            4. Sécurité des données
          </h2>
          <p>
            Nous mettons en place des mesures techniques et organisationnelles
            pour protéger vos informations contre tout accès, modification,
            divulgation ou destruction non autorisée. Cependant, aucun système
            n’étant totalement infaillible, nous ne pouvons garantir une
            sécurité absolue.
          </p>
        </section>
        <section>
          <h2 className='text-xl font-semibold mb-2'>5. Vos droits</h2>
          <p>
            Conformément à la législation en vigueur, vous disposez de droits
            sur vos données :
          </p>
          <ul>
            <li className='list-disc list-inside'>
              <span className='font-semibold'>Accès :</span> savoir quelles
              données nous détenons à votre sujet.
            </li>
            <li className='list-disc list-inside'>
              <span className='font-semibold'>Rectification :</span> corriger ou
              mettre à jour vos informations personnelles.
            </li>
            <li className='list-disc list-inside'>
              <span className='font-semibold'>Suppression :</span> demander
              l’effacement de vos données, sauf obligation légale de
              conservation.
            </li>
            <li className='list-disc list-inside'>
              <span className='font-semibold'>
                Opposition & retrait du consentement :
              </span>{' '}
              refuser l’utilisation de vos données à des fins marketing.
            </li>
          </ul>
        </section>
      </div>
    </Container>
  )
}

export default page
