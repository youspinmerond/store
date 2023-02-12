import createOrder from 'actions/createOrder'

interface Order {
  fullname: string
  description?: string
  phone: string
  city: string
  address?: string
  verefied?: boolean
  moderator_id?: number
  product_id: number
}

export default async function handler(req:any,res:any) {
  try {
    if(typeof req.body !== 'string') return res.status(400).json({message:`Wrong datatype, instead '${typeof req.body}' use 'string'.`})
    if(req.body === '') return res.status(400).json({message:"You're sent empty request body."})

    const body:Order = JSON.parse(JSON.parse(JSON.stringify(req.body).replace(/(?:\\[rn])+/g, '')))
    if(!body.fullname) return res.status(400).json({message:"You're forget to specify \"fullname\" option"})
    if(!body.phone) return res.status(400).json({message:"You're forget to specify \"phone\" option"})
    if(body.phone.length !== 12) return res.status(400).json({message:"Not enough number in phone number.(have to be 12)"})
    if(!body.city) return res.status(400).json({message:"You're forget to specify \"city\" option"})
    if(!body.product_id) return res.status(400).json({message:"You're forget to specify \"product_id\" option"})

    createOrder(body)
      .then(order => {
        res.status(200).json({order:order})
      })
  } catch (e) {
    console.log(e)
    res.status(400).json({message:"Problem with your data. Try to remove ',' from last option in JSON, or retype request body."})
  }
  
}