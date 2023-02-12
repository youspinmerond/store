import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function createProduct(id:number)
{
  const product = await prisma.product.findUnique({
    where:{
      id:id
    },
    select:{
      id:true,
      name: true,
      description: true,
      category: true,
      price: true,
      current: true
    }
  })
  return product
}