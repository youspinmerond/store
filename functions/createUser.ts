import { PrismaClient } from "@prisma/client"
import isBusy from "./isBusy"
const prisma = new PrismaClient()

export default async function createUser(name:string, email:string, password:string, role:number) {

  let Busy:null | 'email' | 'name' = null;
  await isBusy('email', email)
    .then(email1 => email1 !== null ? Busy = 'email' : null)
  await isBusy('name', name)
    .then(username => username !== null ? Busy = 'name' : null)

  if(Busy !== null) return Busy

  const user = await prisma.user.create({
    data:{
      name: name,
      email: email,
      password: password,
      role: role
    }
  })

  return {
    ...user,
    password: undefined
  }
  
}