import Container from '@/components/Container'
import StatsCharts from '@/components/StatsCharts'
import { client } from '@/sanity/lib/client'
import { getFirstOrderMonth } from '@/sanity/lib/orders/getOrderFirstDate'
import { getArticleCountByCategory } from '@/sanity/lib/products/getCountProductsByCategory'

export const metadata = {
  title: 'Dashboard',
  description: 'Suivi des ventes, commandes et abonnements à la newsletter',
}

// Fonction pour récupérer les données du dashboard
async function getDashboardData() {
  // Requête GROQ compatible
  const query = `
    {
      "orders": count(*[_type == "order"]),
      "newsletter": count(*[_type == "newsletterSubscriber" && status == "confirmed"]),
      "ordersList": *[_type == "order" && defined(totalPrice)]{
        totalPrice,
        orderDate
      }
    }
  `

  const data = await client.fetch(query)

  // Calcul total des ventes
  const totalSales = data.ordersList.reduce(
    (sum: number, order: { totalPrice: number }) =>
      sum + (order.totalPrice || 0),
    0
  )

  // Calcul des ventes par mois pour les graphiques
  const salesByMonth: Record<string, { orders: number; sales: number }> = {}
  for (const order of data.ordersList) {
    const date = new Date(order.orderDate)
    const month = date.toLocaleString('fr-FR', { month: 'short' })
    if (!salesByMonth[month]) {
      salesByMonth[month] = { orders: 0, sales: 0 }
    }
    salesByMonth[month].orders += 1
    salesByMonth[month].sales += order.totalPrice || 0
  }

  const chartData = Object.entries(salesByMonth).map(([month, values]) => ({
    month,
    ...values,
  }))

  return {
    orders: data.orders || 0,
    sales: totalSales,
    newsletter: data.newsletter || 0,
    chartData,
  }
}

// Page Dashboard
export default async function DashboardPage() {
  const stats = await getDashboardData()
  const firstOrder = await getFirstOrderMonth() // Peut retourner null
  const mois = firstOrder?.mois || '—' // Sécurisation si aucune commande

  //
  const productsCountByCategory = await getArticleCountByCategory()

  // données pour le donut
  const products = await client.fetch(`
    *[_type == "product" && defined(stock)]{
      _id,
      name,
      stock
    }
  `)

  return (
    <Container>
      <h1 className='text-3xl font-bold tracking-tight mb-6'>
        Tableau de bord
      </h1>
      <StatsCharts
        stats={stats}
        mois={mois}
        productsCountByCategory={productsCountByCategory}
        products={products}
      />
    </Container>
  )
}
