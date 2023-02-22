import Link from 'next/link'
import notVerefiedOrders from '@/actions/checkNotVerefiedOrders'
import FormCreateProduct from '@/components/FormCreateProduct'
import createProduct from '@/actions/createProduct'
import Orders from '@/components/Orders'

import styles from 'styles/admin.module.sass'

interface AdminObj {
  response: {
    approved: boolean
    moderator: {
      nickname: string
      fullname: string
      verefied: number
    }
  },
  orders: Order[]
}

interface Product {
  name: string
  description: string
  category: string
  price: number
  current: "EUR" | "USD" | "UAH" | "GBP"
  passwordAdmin: string
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

export default function Admin({response, orders}:AdminObj) {
  
  if(response.approved && response.moderator)
  {
    return (
      <div>
        <h1>Admin Page</h1>
        <Link href="/" style={{color:"#000",fontSize:"1.5rem", margin:"0 0 1rem", display:"block"}}>To Main Page</Link>
        
        <div className={styles.square}>
          <span className={styles.squareTitle}>Profile</span>
          <p>You&apos;re logged as <b>{response.moderator.nickname}</b></p>
          <p>Verefied orders count <b>{response.moderator.verefied}</b></p>
        </div>

        <Orders orders={orders}/>

        <FormCreateProduct/>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Access Denied</h1>
      </div>
    )
  }
}

export async function getServerSideProps(ctx:any) {

  let res = await fetch('http://localhost:3000/api/proofs', {
    credentials: 'same-origin',
    headers: {
      Cookie: ctx.req.headers.cookie
    }
  })
  const handledres = await res.json()

  let orders = null;
  if(handledres.approved) {
    orders = await notVerefiedOrders()
  }

  return {
    props: {
      response: handledres,
      orders: orders
    }
  }
}