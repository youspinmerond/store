import Image from 'next/image'
import styles from 'styles/header.module.sass'
import basketImg from 'images/basket.svg'
import { useState } from 'react'

type NavObj = {
  basket: any
  showBasket: any
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

export default function Navigation({basket, showBasket}:NavObj) {
  
  return (
    <nav>
      <div className={styles.basket}>
        {
          basket.length ?
          <>
            <Image src={basketImg} alt="basket" width={20} height={14} onClick={() => showBasket[1](!showBasket[0])}/>
            <span className="count">{basket.length}</span>
          </>
          : null
        }
      </div>
    </nav>
  )
}