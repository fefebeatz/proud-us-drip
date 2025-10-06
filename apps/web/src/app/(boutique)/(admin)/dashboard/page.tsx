import Container from '@/components/Container'
import StatsCharts from '@/components/StatsCharts'
import { client } from '@/sanity/lib/client'
import { getFirstOrderMonth } from '@/sanity/lib/orders/getOrderFirstDate'

export const metadata = {
  title: 'Dashboard',
  description: 'Suivi des ventes, commandes et abonnements à la newsletter',
}

async function getDashboardData() {
  const query = `
    {
      "orders": count(*[_type == "order"]),
      "sales": sum(*[_type == "order"].totalPrice),
      "newsletter": count(*[_type == "newsletterSubscriber"]),
      "monthlyData": *[_type == "order"] {
        "month": dateTime(orderDate)[0..6],
        totalPrice
      }
    }
  `
  const data = await client.fetch(query)

  // Traitement du graphique par mois
  const salesByMonth: Record<string, { orders: number; sales: number }> = {}
  for (const order of data.monthlyData || []) {
    const date = new Date(order.month)
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
    sales: data.sales || 0,
    newsletter: data.newsletter || 0,
    chartData,
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardData()
  const { mois } = await getFirstOrderMonth()

  return (
    <Container>
      <h1 className='text-3xl font-bold tracking-tight'>Tableau de bord</h1>
      <StatsCharts stats={stats} mois={mois} />
    </Container>
  )
}
