import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

interface Product {
  name: string,
  description: string,
  category: string,
  price: number,
  current: "EUR" | "USD" | "UAH" | "GBP"
}

export default async function createProduct({name,description,category,price,current}:Product)
{
  const product = await prisma.product.create({
    data: {
      name:name,
      description:description,
      category:category,
      price: price,
      current:current
    }
  })
  return product
}