export const headerData = [
  { title: 'Accueil', href: '/', status: '' },
  { title: 'Nouveauté', href: '/articles/status', status: 'Nouveau' },
  { title: 'Hot', href: '/articles/status', status: 'Hot' },
  { title: 'Promo', href: '/articles/status', status: 'Promo' },
  { title: 'En vedette', href: '/articles/status', status: 'Vedette' },
]

export const imagesBanner = [
  {
    name: 'banner1',
    src: '/1.jpeg',
    description:
      'Un style urbain qui allie confort et authenticité pour affirmer ta personnalité.',
  },
  {
    name: 'banner2',
    src: '/2.jpeg',
    description:
      'La pièce incontournable pour ceux qui vivent la rue comme un terrain d’expression.',
  },
  {
    name: 'banner3',
    src: '/3.jpeg',
    description:
      'Entre élégance décontractée et attitude rebelle, ce vêtement réinvente le streetwear.',
  },
  {
    name: 'banner4',
    src: '/4.jpeg',
    description:
      'Conçu pour bouger librement sans jamais compromettre ton style.',
  },
  {
    name: 'banner5',
    src: '/5.jpeg',
    description:
      'Un mélange parfait de tendances actuelles et d’inspirations underground.',
  },
  {
    name: 'banner6',
    src: '/6.jpeg',
    description:
      'Plus qu’un habit, une signature qui reflète ton énergie et ton identité.',
  },
  {
    name: 'banner7',
    src: '/7.jpeg',
    description:
      'Du béton aux soirées, ce look s’adapte à chaque instant de ta journée.',
  },
]

export const categories = [
  { title: 'Bonnets', value: 'bonnet' },
  { title: 'Casquettes', value: 'casquette' },
]

// liens du footer
export const quickLinksData = [
  { title: 'A propos de nous', href: '/apropos' },
  { title: 'Contactez-nous', href: '/contact' },
  { title: 'Termes & conditions', href: '/termes' },
  { title: 'Politique de confidentialité', href: '/politique' },
  { title: 'FAQ', href: '/faq' },
]

// pour la FAQ

export type FAQItem = {
  question: string
  answer: string
}

export const faqData: FAQItem[] = [
  {
    question: 'Quels sont les délais de livraison ?',
    answer:
      'Nous expédions toutes les commandes sous 24 à 48 heures. Les délais de livraison varient selon votre localisation, généralement entre 3 et 7 jours ouvrés.',
  },
  {
    question: 'Quels modes de paiement acceptez-vous ?',
    answer:
      'Nous acceptons les paiements par carte bancaire (Visa, Mastercard), Via stripe',
  },
  {
    question: 'Puis-je retourner un article ?',
    answer:
      'Oui, vous pouvez retourner un article sous 14 jours après réception. L’article doit être non porté, dans son emballage d’origine, avec toutes les étiquettes.',
  },
  {
    question: 'Comment suivre ma commande ?',
    answer:
      'Dès que votre commande est expédiée, nous vous envoyons un e-mail avec le numéro de suivi.',
  },
  {
    question: 'Proposez-vous des échanges de taille ?',
    answer:
      'Oui, si la taille de votre produit ne convient pas, vous pouvez demander un échange sous 14 jours suivant la réception.',
  },
  {
    question: 'Comment créer un compte sur Proud Us Drip ?',
    answer:
      "Cliquez sur 'Se connecter' en haut à droite du site et validez votre inscription via Google, Facebook ou Apple.",
  },
  {
    question: 'Mes informations personnelles sont-elles sécurisées ?',
    answer:
      'Oui, nous utilisons des protocoles de sécurité avancés pour protéger vos données personnelles et vos informations de paiement.',
  },
  {
    question: 'Proposez-vous des promotions ou réductions ?',
    answer:
      'Oui, nous proposons régulièrement des offres et promotions. Inscrivez-vous à notre newsletter pour recevoir toutes les nouveautés et offres exclusives.',
  },
  {
    question: 'Que faire si je reçois un article défectueux ?',
    answer:
      'Contactez notre service client via l’e-mail contact@proudusdrip.com avec une photo du produit. Nous procéderons à un remboursement ou un remplacement rapide.',
  },
  {
    question: 'Puis-je annuler ma commande ?',
    answer:
      'Les commandes peuvent être annulées uniquement avant l’expédition. Veuillez contacter rapidement notre service client pour toute demande d’annulation.',
  },
]
