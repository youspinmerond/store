import { useState } from "react"
import styles from 'styles/admin.module.sass'
import Order from "./Order"

interface Orders {
  orders: {
    id: number
    fullname: string
    phone: string
    city: string
    address: string
    verefied: boolean
    products_info: any
  }[]
}
interface Order {
  id: number
  fullname: string
  phone: string
  city: string
  address: string
  verefied: boolean
  products_info: any
}

export default function Orders({orders}:Orders) {

  return (
    <div className={styles.square}>
      <span className={styles.squareTitle}>Not verefied orders</span>
      <table border={1} cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td>ID</td>
            <td>FullName</td>
            <td>Phone number</td>
            <td>City</td>
            <td>Address</td>
            <td>Verefied</td>
            <td>ProductsId</td>
          </tr>
          {
            orders.length > 0 ?
            orders.map((order:Order) => (
              <tr key={order.id}>
                <Order order={order}/>
              </tr>
            ))
            :
            <tr>
              <td>You</td>
              <td>Happy</td>
              <td>No</td>
              <td>Orders</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}