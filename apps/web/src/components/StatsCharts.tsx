'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { Users, ShoppingCart, Mail, Shirt } from 'lucide-react'

type ChartSlice = {
  _id: string
  name: string
  value: number
}

type DashboardProps = {
  stats: {
    orders: number
    sales: number
    newsletter: number
    chartData: {
      month: string
      orders: number
      sales: number
    }[]
  }

  mois: string
  productsCountByCategory: {
    title: string
    slug: string
    articleCount: number
  }[]
  products: {
    _id: string
    name: string
    stock: number
  }[]
}

const COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#f97316',
  '#ef6aa8',
  '#4ade80',
  '#60a5fa',
  '#a78bfa',
  '#f472b6',
]

export default function StatsCharts({
  stats,
  mois,
  productsCountByCategory,
  products,
}: DashboardProps) {
  const flat: ChartSlice[] = (products || [])
    .map((p) => ({
      _id: p._id,
      name: p.name ?? 'Sans titre',
      value: Number(p.stock ?? 0),
    }))
    .filter((p) => p.value > 0)

  // Étape 2 : limiter le nombre de parts visibles
  const MAX_SLICES = 12
  let chartDataDonut: ChartSlice[] = flat

  if (flat.length > MAX_SLICES) {
    const sorted = [...flat].sort((a, b) => b.value - a.value)
    const topSlices = sorted.slice(0, MAX_SLICES - 1)
    const others = sorted.slice(MAX_SLICES - 1)
    const othersTotal = others.reduce((sum, item) => sum + item.value, 0)
    chartDataDonut = [
      ...topSlices,
      { _id: 'others', name: 'Autres', value: othersTotal },
    ]
  }
  const total = chartDataDonut.reduce((s, d) => s + d.value, 0)

  return (
    <>
      {/* Statistiques globales */}
      <div className='grid gap-4 md:grid-cols-3 mb-6'>
        {/* ---- Commandes ---- */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Commandes</CardTitle>
            <ShoppingCart className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            {stats ? (
              <>
                <div className='text-2xl font-bold'>{stats.orders}</div>
                <p className='text-xs text-muted-foreground'>
                  Total depuis {mois}
                </p>
              </>
            ) : (
              <div className='text-2xl font-bold'>
                Aucune commande pour l&apos;instant.
              </div>
            )}
          </CardContent>
        </Card>

        {/* ---- Ventes ---- */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Ventes (€)</CardTitle>
            <Users className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            {stats ? (
              <>
                <div className='text-2xl font-bold'>
                  {stats.sales.toLocaleString()}€
                </div>
                <p className='text-xs text-muted-foreground'>
                  Total depuis {mois}
                </p>
              </>
            ) : (
              <div className='text-2xl font-bold'>
                Aucune vente pour l&apos;instant.
              </div>
            )}
          </CardContent>
        </Card>

        {/* ---- Newsletter ---- */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Abonnés Newsletter
            </CardTitle>
            <Mail className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            {stats ? (
              <>
                <div className='text-2xl font-bold'>{stats.newsletter}</div>
                <p className='text-xs text-muted-foreground'>
                  Total d&apos;inscrits
                </p>
              </>
            ) : (
              <p className='text-xs text-muted-foreground'>
                Aucun inscrit pour l&apos;instant.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <h1 className='text-2xl font-bold tracking-tight mb-6'>En stock</h1>

      <div className='grid gap-4 md:grid-cols-3 mb-6'>
        {/* ---- Catégories ---- */}
        {productsCountByCategory.map((cat) => (
          <Card
            key={cat.slug}
            className='flex flex-col justify-between min-h-[130px]' // même hauteur que les autres
          >
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>{cat.title}</CardTitle>

              {/* 🧥 Icône vêtements — tu peux choisir celle qui correspond le mieux */}
              {/* Shirt : 👕 | Clothes : 🧥 | Tags : 🏷️ */}
              <Shirt className='h-5 w-5 text-muted-foreground' />
            </CardHeader>

            <CardContent>
              <div className='text-2xl font-bold'>{cat.articleCount}</div>
              <p className='text-xs text-muted-foreground'>
                Articles dans cette catégorie
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className='mb-6'>
        <CardHeader className='flex items-center justify-between pb-2'>
          <CardTitle className='text-sm font-medium'>
            Répartition du stock (articles)
          </CardTitle>
        </CardHeader>

        <CardContent className='h-[400px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={chartDataDonut}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                label={({ name, percent }) =>
                  `${name} ${((percent as number) * 100).toFixed(0)}%`
                }
              >
                {chartDataDonut.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value: number) => {
                  const pct = total
                    ? ((Number(value) / total) * 100).toFixed(1)
                    : '0.0'
                  return [`${value}`, `${pct}%`]
                }}
              />

              <Legend verticalAlign='bottom' />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Graphiques */}
      <Tabs defaultValue='orders' className='w-full'>
        <TabsList className='grid grid-cols-2 md:w-1/3'>
          <TabsTrigger value='orders'>Commandes</TabsTrigger>
          <TabsTrigger value='sales'>Ventes</TabsTrigger>
        </TabsList>

        <TabsContent value='orders' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Évolution des commandes</CardTitle>
            </CardHeader>
            <CardContent className='h-[300px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={stats.chartData}>
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='orders' fill='#0ea5e9' radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='sales' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Évolution des ventes (€)</CardTitle>
            </CardHeader>
            <CardContent className='h-[300px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={stats.chartData}>
                  <XAxis dataKey='month' />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type='monotone'
                    dataKey='sales'
                    stroke='#10b981'
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
