import Header from 'components/Header'
import Products from 'components/Products'
import Basket from 'components/Basket'

import styles from 'styles/Home.module.sass'
import { useState } from 'react'

export default function Home(list:any) {
  
  let basket = useState([])
  let showBasket = useState<boolean>(false)

  return (
    <>
      <main className={styles.main}>
        <Header basket={basket[0]} showBasket={showBasket}/>
        {
          showBasket[0] === false ?
          <Products list={list} basket={basket} />
          :
          <Basket basket={basket}/>
        }
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const list = await fetch("http://localhost:3000/api/getProducts")
    .then(list => list.json())
  
  return {
    props: {
      list: list
    }
  }
}