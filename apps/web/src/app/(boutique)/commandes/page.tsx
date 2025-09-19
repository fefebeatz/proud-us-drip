import Container from '@/components/Container'
import Logo from '@/components/Logo'
import OrdersComponent from '@/components/OrdersComponent'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getMyOrders } from '@/sanity/lib/orders/getOrdersByCustomer'
import { auth } from '@clerk/nextjs/server'
import { FileX } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export type Order = {
  _id: string
  _type: 'order'
  orderNumber: string
  invoice?: {
    id?: string
    number?: string
    hosted_invoice_url?: string
  }
  stripeCheckOutSessionId?: string
  stripeCustomerId: string
  clerkUserId: string
  customerName: string
  customerEmail: string
  stripePaiementIntent: string
  products?: Array<{
    _key: string // Sanity automatically adds a _key to array items
    product: {
      _ref: string
      _type: 'reference'
    }
    quantity?: number
  }>
  totalPrice: number
  currency: string
  amountDiscount: number
  status?: 'En cours' | 'Payé' | 'Expédié' | 'Livré' | 'Annulé'
  orderDate: string // datetime in Sanity typically maps to string in TypeScript
}

const OrderPage = async () => {
  const { userId } = await auth()

  if (!userId) return redirect('/')

  const orders = await getMyOrders(userId)

  return (
    <Container className='py-10'>
      {orders.length ? (
        <Card className='w-full'>
          <CardHeader>
            <CardTitle className='text-2xl md:text-3xl'>
              Liste des commandes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className='w-full'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-auto'>N° de commande</TableHead>
                    <TableHead className='hidden md:table-cell'>Date</TableHead>
                    <TableHead>Identité client</TableHead>
                    <TableHead className='hidden sm:table-cell'>
                      Email
                    </TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className='hidden sm:table-cell'>
                      N° de facture
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <OrdersComponent orders={orders} />
                <ScrollBar orientation='horizontal' />
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <div className='flex flex-col items-center justify-center py-5 md:py-10 px-4'>
          <FileX className='w-24 h-24 text-gray-400 mb-4' />
          <Logo className='font-semibold text-2xl'>
            Aucune commande n&apos;a été trouvé.
          </Logo>
          <p className='mt-2 text-sm text-gray-600 text-center max-w-md'>
            Vous n&apos;avez encore validé aucun achat. Commandez et retrouvez
            vos achats ici.
          </p>
          <Button asChild className='mt-6'>
            <Link href='/'>Parcourir les articles</Link>
          </Button>
        </div>
      )}
    </Container>
  )
}

export default OrderPage
