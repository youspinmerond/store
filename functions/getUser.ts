import { PrismaClient } from "@prisma/client"
import Validator from "./emailValidator"

const prisma = new PrismaClient()

export default async function getUser(name_email:string, password:string) {
  let result;

  if(Validator(name_email) === true) {
    const user = await prisma.user.findUnique({
      where:{
        email: name_email
      },
      select:{
        id:true,
        name: true,
        email: true,
        password: true
      }
    })
    if(user?.password !== password) return result = await 'wrong'
    result = await user
  } else {
    const user = await prisma.user.findUnique({
      where:{
        name: name_email
      },
      select:{
        id:true,
        name: true,
        email: true,
        password: true
      }
    })
    if(user?.password !== password) return result = await 'wrong'
    result = await user
  }
  const user = result;

  return {
    ...user,
    password: undefined
  }
  
}