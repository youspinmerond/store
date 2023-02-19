import verifyOrder from "@/actions/verifyOrder"
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"

interface Order {
  id: number
  fullname: string
  phone: string
  city: string
  address: string
  verefied: boolean
  products_info: any
}

export default function handler(req:NextApiRequest, res:NextApiResponse) {

  if(!JSON.parse(req.body)) return
  const order:Order = JSON.parse(req.body).order
  if(!order.id) return res.status(400).json({message:"You didn't specified id."})
  
  verifyOrder(order)
    .then( order => {
      if(order === null) return res.status(400).json({message:"Something wrong"})
      res.status(200).json({order: order})
    })
}