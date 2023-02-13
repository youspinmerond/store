import notVerefiedOrders from '@/actions/checkNotVerefiedOrders'

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
  orders:any
}
export default function Admin({response, orders}:AdminObj) {
  
  if(response.approved)
  {
    return (
      <div>
        <h1>Admin Page</h1>
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
                <td>ProductId</td>
                <td>Product Info</td>
              </tr>
              {
                orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.fullname}</td>
                    <td>{order.phone}</td>
                    <td>{order.city}</td>
                    <td>{order.address}</td>
                    <td><b>{order.verefied ? 'yes' : 'no'}</b></td>
                    <td>{order.product_id}</td>
                    <td>
                      <table border={1} cellPadding={0} cellSpacing={0}>
                        <tbody>
                          <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Category</td>
                            <td>Price</td>
                            <td>Current</td>
                          </tr>
                          <tr>
                            <td>{order.product.id}</td>
                            <td>{order.product.name}</td>
                            <td>{order.product.description}</td>
                            <td>{order.product.category}</td>
                            <td>{order.product.price}</td>
                            <td>{order.product.current}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className={styles.square}>
          <div className={styles.squareTitle}>Create Product</div>
          <form>
            <input name="name" className={styles.input} type="text" placeholder='Name'/>
            <input name="description" className={styles.input} type="text" placeholder='Description'/>
            <input name="category" className={styles.input} type="text" placeholder='Category'/>
            <input name="price" className={styles.input} type="text" placeholder='Price'/>
            <input name="current" className={styles.input} type="text" placeholder='Current'/>
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