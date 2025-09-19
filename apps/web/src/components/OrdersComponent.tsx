'use client'

import { Order } from '@/app/(boutique)/commandes/page'
import React, { useState } from 'react'
import { TableBody, TableCell, TableRow } from './ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { format } from 'date-fns'
import OrderDetailsDialog from './OrderDetailsDialog'

interface Props {
  orders: Order[]
}

const OrdersComponent = ({ orders }: Props) => {
  const [selectedOrder, setSelectesOrder] = useState<Order | null>(null)
  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => (
            <Tooltip key={order.orderNumber}>
              <TooltipTrigger asChild>
                <TableRow
                  className='cursor-pointer hover:bg-gray-100 h-12'
                  onClick={() => setSelectesOrder(order)}
                >
                  <TableCell className='font-medium'>
                    {order.orderNumber.slice(-10) ?? 'N/A'}
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    {order.orderDate &&
                      format(new Date(order.orderDate), 'dd-MM-yyyy')}
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.customerEmail}</TableCell>
                  <TableCell className='font-medium text-dark-color'>
                    {order.totalPrice}€
                  </TableCell>
                  <TableCell>
                    {order.status && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Payé'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    {order.invoice ? <p>{order.invoice.number}</p> : '----'}
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>
                Cliquez pour voir le détail de la commande
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectesOrder(null)}
      />
    </>
  )
}

export default OrdersComponent
