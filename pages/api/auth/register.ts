import createUser from "@/functions/createUser"
import isBusy from "functions/isBusy"

interface bodyObj {
  id: number,
  name: string,
  email: string,
  password: string
}

export default async function handler(req:any, res:any) {
  if(req.method !== 'POST') return res.status(400).json({message:"Not Allowed method, use 'POST'."})
  if(typeof req.body !== 'string') return res.status(422).json({message:"Wrong data type. Try to send plain text."})
  
  const body:bodyObj = JSON.parse(req.body)

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
        
        // console.log(req.headers.cookie.split(' '))
        // I STILL WORKING HERE

        return res.status(400).json({message:"it's busy!"})
      }
    })
 
}