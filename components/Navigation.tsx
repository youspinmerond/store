import Image from 'next/image'
import styles from 'styles/header.module.sass'
import basketImg from 'images/basket.svg'
import { useState } from 'react'

type NavObj = {
  basket: any
}

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

export default function Navigation({basket}:NavObj) {
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
      .then(res => console.log(res))
  }
  let [showBasket, setShowBasket] = useState<boolean>(false)

  function Basket() {
    const products_info = basket.map((e:any) => `product = ${e.product.name} count = ${e.count}, \n`)
    return (
      <div className={styles.basketMenu}>
        <h1>Basket</h1>
        {
        basket.map((product:any) => (
          <div className={styles.basketElem} key={product.product.key}>
            <div className="name">{product.product.name}</div>
            <div className="count">{product.count}</div>
          </div>
        ))
        }
        <div>
          <form onSubmit={(e:any) => createOrder(e)}>
            <input name="fullname" placeholder="your name" type="text" required/><span style={{color:"red"}}>*</span>
            <input name="phone" placeholder="your phone number" type="text" minLength={12} required/><span style={{color:"red"}}>*</span>
            <input name="city" placeholder="your city" type="text" /><span style={{color:"red"}}>*</span>
            <input name="address" placeholder="your address" type="text" />
            <input type="submit" value="order" style={{display:"block"}}/>
            <input type="text" hidden name="products" value={products_info} />
          </form>
        </div>
      </div>
    )
  }
  return (
    <nav>
      <div className={styles.basket}>
        {showBasket ? <Basket/> : null}
        {
          basket.length ?
          <>
            <Image src={basketImg} alt="basket" width={20} height={14} onClick={() => setShowBasket(!showBasket)}/>
            <span className="count">{basket.length}</span>
          </>
          : null
        }
      </div>
    </nav>
  )
}