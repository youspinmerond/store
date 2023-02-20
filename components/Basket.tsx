import styles from 'styles/header.module.sass'

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
      <h1>Basket</h1>
      {
      basket[0].map((product:any) => (
        <div className={styles.basketElem} key={product.product.key}>
          <button className={styles.basketDelete} onClick={() => deleteFromBasket(product)}>X</button>
          <div className={styles.basketMain}>
            <div className="name">{product.product.name}</div>
            <div className={styles.basketProductCount}>{product.count}</div>
          </div>
        </div>
      ))
      }
      <div>
        <form onSubmit={(e:any) => createOrder(e)} className={styles.basketSubmit}>
          <div className="formElem">
            <input name="fullname" placeholder="your name" type="text" required/>
            <span style={{color:"red"}}>*</span>
          </div>
          
          <div className="formElem">
          <input name="phone" placeholder="your phone number" type="text" minLength={12} required/>
          <span style={{color:"red"}}>*</span>
          </div>
          
          <div className="formElem">
            <input name="city" placeholder="your city" type="text" />
            <span style={{color:"red"}}>*</span>
          </div>
          <div className="formElem">
            <input name="address" placeholder="your address" type="text" />
          </div>
          <input type="submit" value="order" style={{display:"block"}}/>
          <input type="text" hidden name="products" value={products_info} />
        </form>
      </div>
    </div>
  )
}