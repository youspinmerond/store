import { useState } from "react"

interface Order {
  order: {
    id: number
    fullname: string
    phone: string
    city: string
    address: string
    verefied: boolean
    products_info: any
  }
}

export default function Order({order}:Order) {
  
  async function handler(e:any) {
    if(e.target.value === 'verify') {
      fetch('http://localhost:3000/api/verifyOrder', {
        method: "POST",
        body: JSON.stringify({order: order})
      })
    } else return
  }

  return (
    <>
      <td>{order.id}</td>
      <td>{order.fullname}</td>
      <td>{order.phone}</td>
      <td>{order.city}</td>
      <td>{order.address}</td>
      <td>
        <select id="Verefying" onChange={(e) => handler(e)}>
          <option value="">
            Verify?
          </option>
          <option value="verify">
            Verify
          </option>
        </select>
        </td>
      <td>{order.products_info.join(", ")}</td>
    </>
  )
}