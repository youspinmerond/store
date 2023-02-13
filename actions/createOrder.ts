import checkProduct from 'actions/checkProduct'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

interface Order {
  fullname: string
  description?: string
  phone: string
  city: string
  address?: string
  verefied?: boolean
  moderator_id?: number
  products_id: number
}

export default async function createOrder(
  {
    fullname,description="",
    phone,
    city,
    address="",
    verefied=false,
    moderator_id=0,
    products_id
  }:Order)
{
  console.log([fullname, phone, city, address, verefied, moderator_id, products_id])

  const order = await prisma.orders.create({
    data: {
      fullname:fullname,
      description: description,
      phone:phone,
      city:city,
      address: address,
      verefied: verefied,
      moderator_id: moderator_id,
      products_id: products_id
    }
  })
  return {...order}
}