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
            <div key={product.id} className={styles.product}>
              <div className="id" style={{display:"none"}}>{product.id}</div>
              <div className={styles.name}>{product.name}</div>
              <div className="description">{product.description}</div>
              <div className="price">{product.price}{product.current}</div>
              <input type="submit" value="Order"/>
            </div>
          ))
        }
      </div>
    </div>
  )
}