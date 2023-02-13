import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

interface Moderator {
  nickname: string,
  fullname: string,
  password: string,
  verefied: 0
}

export default async function createModerator({nickname, fullname, password, verefied}:Moderator)
{
  const moderator = await prisma.moderators.create({
    data: {
      nickname:nickname,
      fullname:fullname,
      password:password,
      verefied: verefied
    }
  })
  return {...moderator, password: undefined}
}