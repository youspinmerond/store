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
  basket: any
}

export default function Product({product, basket}:productObj) {
  const [count, setCount] = useState(1)

  function increase(num:number) {
    if(count >= 100) return
    setCount(count+num)
  }
  function reduce(num:number) {
    if(count === 1) return
    setCount(count-num)
  }

  function orderProduct() {
    basket[1]((prev:any) => prev.concat({product:product, count: count, key:prev.length}))
  }

  return (
    <div className={styles.product}>
      <div className={styles.productTop}>
        <div className="id" style={{display:"none"}}>{product.id}</div>
        <div className={styles.name}>{product.name}</div>
        <div className="description">{product.description}</div>
      </div>
      
      <div className={styles.productMiddle}>
        <div className={styles.price}>{product.price}&nbsp;{product.current}</div>
        <div className={styles.productBottom}>
          <input type="submit" value="Order" onClick={() => orderProduct()} className={styles.orderButton}/>
          <div className={styles.productBottomRight}>
            <input type="button" className={styles.productBottomButton} value="-" onClick={() => reduce(1)}/>
            <span>
              {count}
            </span>
            <input type="button" className={styles.productBottomButton} value="+" onClick={() => increase(1)} />
          </div>
        </div>
      </div>
    </div>
  )
}