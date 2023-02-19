import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

interface Order {
  id: number
  fullname: string
  phone: string
  city: string
  address: string
  verefied: boolean
  products_info: any
}

export default async function verifyOrder(order:Order) {
  const res = await prisma.orders.findUnique({
    where:{
      id: order.id
    }
  })
  if(res?.verefied === null || res?.verefied === undefined) return null
  if(res.verefied === true) return null
  if(res.verefied === false) {
    const edit = await prisma.orders.update({
      where: {
        id: order.id
      },
      data: {
        verefied: true
      }
    })
    return edit
  }
}