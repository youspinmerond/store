import { NextApiRequest, NextApiResponse } from "next";
import getProducts from "@/actions/getProducts";

interface ProductsObj {
  products:{
    id: number
    name: string
    description: string
    category: string
    price: number
    current: string
  }[]
}
export default async function handler(req:NextApiRequest,res:NextApiResponse) {
  const products:ProductsObj = await getProducts()
  
  res.status(200).json({products:{products}})
}