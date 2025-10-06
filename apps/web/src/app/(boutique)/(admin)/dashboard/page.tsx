'use client'

import { useEffect, useState } from 'react'
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
} from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import { Users, ShoppingCart, Mail } from 'lucide-react'

export type ChartType = {
  month: string
  orders: number
  sales: number
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    orders: 0,
    sales: 0,
    newsletter: 0,
  })
  const [chartData, setChartData] = useState<ChartType[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        // Exemple : récupération des données depuis ton backend Sanity
        // Ici on simule juste avec un timeout
        setTimeout(() => {
          setStats({
            orders: 120,
            sales: 5400,
            newsletter: 320,
          })
          setChartData([
            { month: 'Jan', orders: 30, sales: 1200 },
            { month: 'Fév', orders: 40, sales: 1500 },
            { month: 'Mar', orders: 20, sales: 800 },
            { month: 'Avr', orders: 50, sales: 1900 },
            { month: 'Mai', orders: 60, sales: 2100 },
          ])
          setLoading(false)
        }, 1200)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='p-6 space-y-8'>
      <h1 className='text-3xl font-bold tracking-tight'>Tableau de bord</h1>

      {/* Statistiques globales */}
      <div className='grid gap-4 md:grid-cols-3'>
        {loading ? (
          <>
            <Skeleton className='h-24 w-full' />
            <Skeleton className='h-24 w-full' />
            <Skeleton className='h-24 w-full' />
          </>
        ) : (
          <>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Commandes</CardTitle>
                <ShoppingCart className='h-5 w-5 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{stats.orders}</div>
                <p className='text-xs text-muted-foreground'>
                  Total depuis janvier
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Ventes (€)
                </CardTitle>
                <Users className='h-5 w-5 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {stats.sales.toLocaleString()}€
                </div>
                <p className='text-xs text-muted-foreground'>
                  Total depuis janvier
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Abonnés Newsletter
                </CardTitle>
                <Mail className='h-5 w-5 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{stats.newsletter}</div>
                <p className='text-xs text-muted-foreground'>
                  Total d&apos;inscrits
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

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
              {loading ? (
                <Skeleton className='h-full w-full' />
              ) : (
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={chartData}>
                    <XAxis dataKey='month' />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey='orders'
                      fill='#0ea5e9'
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='sales' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Évolution des ventes (€)</CardTitle>
            </CardHeader>
            <CardContent className='h-[300px]'>
              {loading ? (
                <Skeleton className='h-full w-full' />
              ) : (
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={chartData}>
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
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
