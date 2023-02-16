import checkProduct from 'actions/checkProduct'

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function notVerefiedOrders()
{
  const orders = await prisma.orders.findMany({
    where: {
      verefied: false
    },
    select: {
      id: true,
      fullname: true,
      phone: true,
      city: true,
      address: true,
      verefied: true,
      products_info: true
    }
  })
  const prepareOrders = await Promise.all(orders.map(async e => {
    return {...e, product: await checkProduct(1)}
  }))

  return prepareOrders//{...orders}
}