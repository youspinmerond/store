import Product from './Product'
import styles from 'styles/products.module.sass'

interface productObj {
  id: number
  name: string
  description: string
  price: number
  current: string
}
interface listObj {
  list: {
    list: {
      products: {
        products: [productObj]
      }
    }
  }
}

export default function Products(list:listObj) {
  const products = list.list.list.products.products
  return (
    <div>
      <h1>Product&apos;s list</h1>
      <div className={styles.list}>
        {
          products.map((product:productObj) => (
            <Product key={product.id} product={product}/>
          ))
        }
      </div>
    </div>
  )
}