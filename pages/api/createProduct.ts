import { NextApiRequest, NextApiResponse } from "next"
import createProduct from 'actions/createProduct'
import checkModerator from "@/actions/checkModerator"

interface Product {
  name: string
  description: string
  category: string
  price: number
  current: "EUR" | "USD" | "UAH" | "GBP"
  passwordAdmin: string
}

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
  if(typeof req.body !== 'string') return res.status(400).json({message:`Wrong datatype, instead '${typeof req.body}' use 'string'.`})
  if(req.body === '') return res.status(400).json({message:"You're sent empty request body."})
  
  
  const body = JSON.parse(JSON.parse(JSON.stringify(req.body).replace(/(?:\\[rn])+/g, '')))

  if(!body.passwordAdmin) return res.status(403).json({message:"Access denied. You're didn't sent password."})
  const moderator = await checkModerator({password:body.passwordAdmin})
  
  if(!moderator) return res.status(403).json({message:"Access denied. Wrong password!"})
  if(!body.name) return res.status(400).json({message:"You're forget to specify \"name\" option"})
  if(!body.description) return res.status(400).json({message:"You're forget to specify \"description\" option"})
  if(!body.category) return res.status(400).json({message:"You're forget to specify \"category\" option"})
  if(!body.price) return res.status(400).json({message:"You're forget to specify \"price\" option"})
  if(!body.current) return res.status(400).json({message:"You're forget to specify \"current\" option"})
  
  createProduct(body)
    .then(e => {
      res.status(201).json({product:e})
    })
}