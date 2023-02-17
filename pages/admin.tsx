import Link from 'next/link'
import notVerefiedOrders from '@/actions/checkNotVerefiedOrders'
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

  async function onSubmit(e:any) {
    e.preventDefault()
    const body:Product = {
      name: e.target.name.value,
      description: e.target.description.value,
      category: e.target.category.value,
      price: parseInt(e.target.price.value),
      current: e.target.current.value,
      passwordAdmin: e.target.password.value
    }
    const res = await fetch("http://localhost:3000/api/createProduct", {
      method: "POST",
      body: JSON.stringify(body)
    }).then(response => {
        response.json()
        // I STILL WORK HERE
      })
  }
  if(response.approved && response.moderator)
  {
    return (
      <div>
        <h1>Admin Page</h1>
        <Link href="/" style={{color:'#fff', fontSize:"1.5rem", margin:"0 0 1rem", display:"block"}}>To Main Page</Link>
        
        <div className={styles.square}>
          <span className={styles.squareTitle}>Profile</span>
          <p>You&apos;re logged as <b>{response.moderator.nickname}</b></p>
          <p>Verefied orders count <b>{response.moderator.verefied}</b></p>
        </div>
        
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
                    <Orders order={order}/>
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
        <div className={styles.square}>
          <div className={styles.squareTitle}>Create Product</div>
          <form method='post' onSubmit={(e) => onSubmit(e)}>
            <input required minLength={5} name="name" className={styles.input} type="text" placeholder='Name'/>
            <input required minLength={20} name="description" className={styles.input} type="text" placeholder='Description'/>
            <input required minLength={2} name="category" className={styles.input} type="text" placeholder='Category'/>
            <input required minLength={1} name="price" className={styles.input} type="text" placeholder='Price'/>
            <input required minLength={1} name="current" className={styles.input} type="text" placeholder='Current'/>
            <input required minLength={12} name="password" className={styles.input} type="password" placeholder='Password'/>
            <input className={styles.input} type="submit" value="Create Product"/>
          </form>
        </div>
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