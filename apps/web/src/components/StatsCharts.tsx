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
} from 'recharts'
import { Users, ShoppingCart, Mail } from 'lucide-react'

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
}

export default function StatsCharts({ stats, mois }: DashboardProps) {
  return (
    <>
      {/* Statistiques globales */}
      <div className='grid gap-4 md:grid-cols-3 mb-3'>
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
