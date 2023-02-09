import createUser from "functions/createUser"
import getCookies from "functions/getCookies"
import isBusy from "functions/isBusy"

interface bodyObj {
  id: number,
  name: string,
  email: string,
  password: string,
  password2: string
}

export default async function handler(req:any, res:any) {
  if(req.method !== 'POST') return res.status(400).json({message:"Not Allowed method, use 'POST'."})
  if(typeof req.body !== 'string') return res.status(422).json({message:"Wrong data type. Try to send plain text."})
  
  
  const cookies:any = getCookies(req.headers.cookie)
  let isLogged:(true | false ) = false;
  if(cookies?.name || cookies?.id || cookies?.email || cookies?.createdAt) {
    isLogged = true
  }
  if(isLogged === true) return res.status(400).json({message:"You're yet logged."})

  const body:bodyObj = JSON.parse(req.body)
  if(body?.password !== body?.password2) return res.status(401).json({message:"You're wrote wrong password."})

  isBusy('name', body.name)
    .then(async e => {
      if(e === null) {
        let result:{id:number,role:number,name:string,email:string} | null = null;
        await createUser(body.name, body.email, body.password, 0)
          .then(async user => {
            result = await user
          })

        return res.status(400).json({result})
      } else {
        return res.status(400).json({message:"it's busy!"})
      }
    })
 
}