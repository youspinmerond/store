import styles from 'styles/admin.module.sass'

interface Product {
  name: string
  description: string
  category: string
  price: number
  current: "EUR" | "USD" | "UAH" | "GBP"
  passwordAdmin: string
}

export default function FormCreateProduct() {

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

  return (
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
  )
}