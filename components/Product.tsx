import { useState } from 'react'
import styles from 'styles/products.module.sass'

interface productObj {
  product: {
    id: number
    name: string
    description: string
    price: number
    current: string
  }
  key: number
}

export default function Product({product, key}:productObj) {
  const [count, setCount] = useState(1)

  function increase(num:number) {
    if(count >= 100) return
    setCount(count+num)
  }
  function reduce(num:number) {
    if(count === 1) return
    setCount(count-num)
  }

  return (
    <div key={key} className={styles.product}>
      <div className="id" style={{display:"none"}}>{product.id}</div>
      <div className={styles.name}>{product.name}</div>
      <div className="description">{product.description}</div>
      <div className="price">{product.price}{product.current}</div>
      <div className={styles.productBottom}>
        <input type="submit" value="Order"/>
        <div className="right">

          <input type="button" value="Less" onClick={() => reduce(1)}/>
          {count}
          <input type="button" value="More" onClick={() => increase(1)} />
        </div>
      </div>
    </div>
  )
}