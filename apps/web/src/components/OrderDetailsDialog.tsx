import { Order } from '@/app/(boutique)/commandes/page'
import React, { FC } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { format } from 'date-fns'
import { Button } from './ui/button'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface Props {
  order: Order | null
  isOpen: boolean
  onClose: () => void
}

const OrderDetailsDialog: FC<Props> = ({ order, isOpen, onClose }) => {
  if (!order) return null
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-scroll'>
        <DialogHeader className='mt-2'>
          <DialogTitle>Détails commandes - {order.orderNumber}</DialogTitle>
        </DialogHeader>
        <div className='mt-4 space-y-1'>
          <p>
            <span className='font-bold'>Client: </span>
            {order.customerName}
          </p>
          <p>
            <span className='font-bold'>Email: </span>
            {order.customerEmail}
          </p>
          <p>
            <span className='font-bold'>Date: </span>
            {format(new Date(order.orderDate), 'dd-MM-yyyy')}
          </p>
          <p>
            <span className='font-bold'>Statut: </span>
            <span
              className={
                order.status === 'Payé' ? 'text-green-600' : 'text-yellow-600'
              }
            >
              {order.status}
            </span>
          </p>
          <p>
            <span className='font-bold'>Facture: </span>
            {order.invoice ? <span>{order.invoice.number}</span> : '----'}
          </p>
          {order.invoice && (
            <Button variant='outline' className='cursor-pointer mt-2'>
              {order.invoice.hosted_invoice_url && (
                <Link href={order.invoice.hosted_invoice_url} target='_blank'>
                  Télécharger la facture
                </Link>
              )}
            </Button>
          )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='font-bold'>Article</TableHead>
              <TableHead className='font-bold'>Quantité</TableHead>
              <TableHead className='font-bold'>Prix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.products?.map((product, index) => (
              <TableRow key={index}>
                <TableCell className='flex items-center gap-2'>
                  {product.product?.images && (
                    <Image
                      src={urlFor(product.product.images[0]).url()}
                      alt={product.product.name}
                      width={50}
                      height={50}
                      className='rounded-sm w-14 h-14 object-cover'
                    />
                  )}
                  <p className='line-clamp-1'>{product.product?.name}</p>
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                {product.product?.price && product.quantity && (
                  <TableCell className='text-dark-color font-medium'>
                    {product.product?.price * product.quantity}€
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='mt-4 text-right flex items-center justify-end'>
          <div className='w-44 flex flex-col gap-1'>
            {order.amountDiscount !== 0 && (
              <div>
                <span className='text-bold'>Réduction: </span>-
                {order.amountDiscount}€
              </div>
            )}
            {order.shipping ? (
              <div>
                <span className='text-bold'>Frais de livraison: </span>
                {order.shipping}€
              </div>
            ) : (
              <div>
                <span className='text-bold'>Frais de livraison: </span>
                {'N/A'}
              </div>
            )}
            {order.amountDiscount !== 0 ? (
              <div>
                <span className='text-bold'>Total: </span>
                {order.amountDiscount +
                  order.totalPrice +
                  (order.shipping ?? 0)}
                €
              </div>
            ) : (
              <div>
                <span className='text-bold'>Total: </span>
                {order.totalPrice + (order.shipping ?? 0)}€
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDetailsDialog
