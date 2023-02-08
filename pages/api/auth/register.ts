import { PrismaClient } from "@prisma/client"

interface bodyObj {
  id: number,
  name: string,
  email: string,
  password: string
}

export default async function handler(req:any, res:any) {
  if(req.method !== 'POST') return res.status(400).json({message:"Not Allowed method, use 'POST'."})
  if(typeof req.body !== 'string') return res.status(422).json({message:"Wrong data type. Try to send plain text."})
  
  const prisma = new PrismaClient()

  const body:bodyObj = JSON.parse(req.body)

  async function main() {
    await prisma.user.create({
      data: {
        role: 0,
        name: body.name,
        email: body.email,
        password: body.password
      }
    })
  }
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
    
  res.status(200).json({user:{
    ...body,
    password: undefined
  }})
}