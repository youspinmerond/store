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
  
  getUser("admini", "TLCvAdcRRgs4bGM")
    .then(e => {console.log(e)})  // I STILL WORK HERE !!!!!!!!!!

}