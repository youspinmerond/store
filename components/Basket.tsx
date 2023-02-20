import styles from 'styles/basket.module.sass'

interface Order {
  fullname: string
  description?: string
  phone: string
  city: string
  address?: string
  verefied?: boolean
  moderator_id?: number
  products_info: string[]
}
export default function Basket({basket}:any) {
  const products_info = basket[0].map((e:any) => `product = ${e.product.name} count = ${e.count}, \n`)

  function createOrder(elem:any) {
    elem.preventDefault()

    const body:Order = {
      fullname: elem.target.fullname.value,
      phone: elem.target.phone.value[0] === "+" ? elem.target.phone.value.slice(1) : elem.target.phone.value,
      city: elem.target?.city.value,
      address: elem.target.address.value,
      products_info: elem.target.products.value
    }
    fetch('http://localhost:3000/api/createOrder', {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(res => res.json())
  }

  function deleteFromBasket(product:any) {

    const newBasket:any[] = []
    basket[0].map((e:any) => e === product ? undefined : newBasket.push(e))
    basket[1](newBasket)
  }

  return (
    <div className={styles.basketMenu}>
      <h1>Shopping Cart</h1>
      <div className={styles.basket}>
        <table className={styles.basketList}>
          <tbody>
            <tr>
              <td>Item</td>
              <td>Price</td>
              <td>Qty</td>
              <td>Subtotal</td>
              <td>Actions</td>
            </tr>
            {
            basket[0].map((product:any) => (
              <tr key={product.product.key}>
                <td>{product.product.name}</td>
                <td><b>{product.product.price} {product.product.current}</b></td>
                <td>{product.count}</td>
                <td><b>{product.product.price*product.count} {product.product.current}</b></td>
                <td><button className={styles.basketDelete} onClick={() => deleteFromBasket(product)}>X</button></td>
              </tr>
            ))
            }
          </tbody>
        </table>

        <form onSubmit={(e:any) => createOrder(e)} className={styles.basketSubmit}>
          <h2 style={{fontSize:'1.5rem'}}>Summary</h2>
          <div className={styles.formElem}>
            <label>Name<span style={{color:"red"}}>*</span></label>
            <input name="fullname" placeholder="your name" type="text" required/>
          </div>
          
          <div className={styles.formElem}>
            <label>Phone<span style={{color:"red"}}>*</span></label>
            <input name="phone" placeholder="your phone number" type="text" minLength={12} required/>
          </div>
          
          <div className={styles.formElem}>
            <label>City<span style={{color:"red"}}>*</span></label>
            <input name="city" placeholder="your city" type="text" />
          </div>
          <div className={styles.formElem}>
            <label>Address</label>
            <input name="address" placeholder="your address" type="text" />
          </div>
          <div className="submit">
            <input type="submit" value="Pay on place" className={styles.paymentOrder}/>
            <input type="submit" value="PayPal" className={styles.paypalOrder}/>
          </div>
          <input type="text" hidden name="products" value={products_info} />
        </form>
      </div>
    </div>
  )
}