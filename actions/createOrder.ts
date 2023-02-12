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
  product_id: number
}

export default async function createProduct(
  {
    fullname,description="",
    phone,
    city,
    address="",
    verefied=false,
    moderator_id=0,
    product_id
  }:Order)
{
  console.log([fullname, phone, city, address, verefied, moderator_id, product_id])
  const product = await checkProduct(product_id)
  if(product === null) return 'no product'

  const order = await prisma.orders.create({
    data: {
      fullname:fullname,
      description: description,
      phone:phone,
      city:city,
      address: address,
      verefied: verefied,
      moderator_id: moderator_id,
      product_id: product_id
    }
  })
  return {...order, product_id:undefined, product}
}