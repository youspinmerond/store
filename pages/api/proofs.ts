import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req:any,res:any) {
  const cookies = req.cookies

  if(!cookies.password) return res.status(403).json({approved: false})
  
  const moderators = await prisma.moderators.findMany(
    {
      where:{
        password: cookies.password
      },
      select:{
        nickname:true,
        fullname:true,
        verefied:true,
      }
  })
  if(moderators.length > 1) return res.status(403).json({message:"wtf, two moders have same password :clown:", approved: false})
  const moderator = moderators[0]

  return res.status(200).json({approved: true, moderator:moderator})
}