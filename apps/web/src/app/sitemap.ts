import { CategoryProps, ProductType } from '@/components/ProductGrid'
import { getCategories } from '@/sanity/lib/products/getAllCategories'
import { getProducts } from '@/sanity/lib/products/getAllProducts'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // article par slug
  const products: ProductType[] = await getProducts()
  const productEntries: MetadataRoute.Sitemap = products.map(({ slug }) => ({
    url: `https://proud-us-drip.vercel.app/article/${slug.current}`,
    // lastModified: new Date(),
    // changeFrequency: "monthly"
  }))

  // articles par status
  const productsByStatus: MetadataRoute.Sitemap = [
    'Nouveau',
    'Hot',
    'Promo',
    'Vedette',
  ].map((status) => ({
    url: `https://proud-us-drip.vercel.app/articles/status/${status}`,
  }))

  // articles par catégories
  const categories: CategoryProps[] = await getCategories()
  const productsByCategory: MetadataRoute.Sitemap = categories.map(
    ({ slug }) => ({
      url: `https://proud-us-drip.vercel.app/categorie/${slug.current}`,
    })
  )

  return [
    {
      url: 'https://proud-us-drip.vercel.app/',
      lastModified: new Date(),
    },
    ...productEntries,
    {
      url: 'https://proud-us-drip.vercel.app/apropos',
      lastModified: new Date(),
    },
    {
      url: 'https://proud-us-drip.vercel.app/contact',
      lastModified: new Date(),
    },
    {
      url: 'https://proud-us-drip.vercel.app/faq',
      lastModified: new Date(),
    },
    {
      url: 'https://proud-us-drip.vercel.app/politique',
      lastModified: new Date(),
    },
    {
      url: 'https://proud-us-drip.vercel.app/termes',
      lastModified: new Date(),
    },
    {
      url: 'https://proud-us-drip.vercel.app/commandes',
      lastModified: new Date(),
    },
    {
      url: 'https://proud-us-drip.vercel.app/favoris',
      lastModified: new Date(),
    },
    {
      url: 'https://proud-us-drip.vercel.app/panier',
      lastModified: new Date(),
    },
    ...productsByStatus,
    ...productsByCategory,
  ]
}
