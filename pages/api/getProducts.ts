import { NextApiRequest, NextApiResponse } from "next";
import getProducts from "@/actions/getProducts";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
  const products = await getProducts()
  
  res.status(200).json({products:{products}})
}