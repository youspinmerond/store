import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function isBusy(row:string, value:string) {

  const isBusy:{[row:string]:[value:string]} | null = await prisma.user.findUnique({
    where:{
      [row]:value
    },
    select:{
      [row]:true
    }
  })
  return isBusy
}