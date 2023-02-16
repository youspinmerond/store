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
  products_info: string[]
}

export default async function createOrder(
  {
    fullname,description="",
    phone,
    city,
    address="",
    verefied=false,
    moderator_id=0,
    products_info
  }:Order)
{
  console.log([fullname, phone, city, address, verefied, moderator_id, products_info])

  const order = await prisma.orders.create({
    data: {
      fullname:fullname,
      description: description,
      phone:phone,
      city:city,
      address: address,
      verefied: verefied,
      moderator_id: moderator_id,
      products_info: products_info
    }
  })
  return {...order}
}