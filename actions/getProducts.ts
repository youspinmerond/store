import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function getProducts()
{
  const product = await prisma.product.findMany({
    where: {},
    select:{
      id:true,
      name:true,
      description:true,
      category:true,
      price:true,
      current:true,
      
    },
    take:20,
  })
  return product
}