'use client'

import { Order } from '@/app/(boutique)/commandes/page'
import React, { useState } from 'react'
import { TableBody, TableCell, TableRow } from './ui/table'
import { Tooltip, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { format } from 'date-fns'

interface Props {
  orders: Order[]
}

const OrdersComponent = async ({ orders }: Props) => {
  const [selectedOrders, setSelectesOrders] = useState(null)
  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => (
            <Tooltip key={order.orderNumber}>
              <TooltipTrigger asChild>
                <TableRow className='cursor-pointer hover:bg-gray-100 h-12'>
                  <TableCell>{order.orderNumber.slice(-10) ?? 'N/A'}</TableCell>
                  <TableCell>
                    {order.orderDate &&
                      format(new Date(order.orderDate), 'dd-MM-yyyy')}
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.customerEmail}</TableCell>
                </TableRow>
              </TooltipTrigger>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
    </>
  )
}

export default OrdersComponent
