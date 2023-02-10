import getUser from "@/functions/getUser";
import getCookies from "functions/getCookies";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {

  const cookies:any = getCookies(req.headers.cookie)

  console.log(cookies)
}