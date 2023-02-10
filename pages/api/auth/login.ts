import getUser from "@/functions/getUser";
import getCookies from "functions/getCookies";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {

  const cookies:any = getCookies(req.headers.cookie)
  let isLogged:(true | false ) = false;
  if(cookies?.name || cookies?.id || cookies?.email || cookies?.createdAt) {
    isLogged = true
  }
  if(isLogged === true) return res.status(400).json({message:"You're yet logged."})
  
  type resultObj = {
    id: number,
    name: string,
    email: string,
    password?: undefined
  } | "wrong"
  
  const result:resultObj = await getUser("admini", "TLCvAdcRRgs4bGM")
  if(result === "wrong") return res.status(500).json({message: "Something wrong."})

  res.setHeader("set-cookie", [`id=${result.id};`, `name=${result.name};`, `email=${result.email};`])

  res.status(200).json({message:"You logged in."})

}