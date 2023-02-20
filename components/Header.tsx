import Navigation from "./Navigation"
import styles from 'styles/header.module.sass'
import { ReactComponentElement } from "react"

interface HeaderObj {
  basket: {
    product:{
      id: number
      name: string
      description: string
      catetory: string
      price: number
      current: string
    }
    count: number
    key: number
  }[]
  showBasket: any
}
export default function Header({basket, showBasket}:HeaderObj):ReactComponentElement<any> {
  return (
    <header className={styles.header}>
      <div className="logo">Store</div>
      <Navigation basket={basket} showBasket={showBasket}/>
    </header>
  )
}