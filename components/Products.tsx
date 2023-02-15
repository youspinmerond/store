import Product from './Product'
import styles from 'styles/products.module.sass'
import { useState } from 'react'

interface productObj {
  id: number
  name: string
  description: string
  price: number
  current: string
}
interface productsObj {
  list: {
    list: {
      products: {
        products: [productObj]
      }
    }
  }
  basket:any
}

export default function Products({list, basket}:productsObj) {
  const products = list.list.products.products
  return (
    <div>
      <h1>Product&apos;s list</h1>
      <div className={styles.list}>
        {
          products.map((product:productObj) => (
            <div key={product.id}>
              <Product product={product} basket={basket}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}