import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

interface RequestObj {
  id?: number
  password?: string
}
export default async function checkModerator({id, password}:RequestObj)
{
  let moderator;
  if(id) {
    moderator = await prisma.moderators.findUnique({
      where:{
        id:id
      },
      select:{
        id:true,
        nickname: true,
        fullname: true,
        verefied: true,
        password: true
      }
    })
  } else if (password) {
    moderator = await prisma.moderators.findUnique({
      where:{
        password:password
      },
      select:{
        id:true,
        nickname: true,
        fullname: true,
        verefied: true,
        password: true
      }
    })
  }
  return moderator
}