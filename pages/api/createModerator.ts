import config from 'config.json'
import { NextApiRequest, NextApiResponse } from 'next'
import createModerator from 'actions/createModerator'

interface Moderator {
  nickname: string
  fullname: string
  password: string
  verefied: 0
  hash: string
}

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
  try {
    if(typeof req.body !== 'string') return res.status(400).json({message:`Wrong datatype, instead '${typeof req.body}' use 'string'.`})
    if(req.body === '') return res.status(400).json({message:"You're sent empty request body."})
    const body:Moderator = JSON.parse(JSON.parse(JSON.stringify(req.body).replace(/(?:\\[rn])+/g, '')))

    if(body.hash !== config.OwnerHash) return res.status(403).json({message:"You're not Owner. You cant create Moderators."})
    if(!body.nickname) return res.status(400).json({message:"You're forget to specify \"nickname\" option"})
    if(!body.fullname) return res.status(400).json({message:"You're forget to specify \"fullname\" option"})
    if(!body.password) return res.status(400).json({message:"You're forget to specify \"password\" option"})
    if(body.password.length <= 12) return res.status(400).json({message:"Important necessary more than 12 symbols in password"})
    
    createModerator(body)
      .then(moderator => {
        res.status(200).json({message:moderator })
      })
  } catch (e) {
    console.log(e)
    res.status(400).json({message:"Problem with your data. Try to remove ',' from last option in JSON, or retype request body."})
  }
  
}