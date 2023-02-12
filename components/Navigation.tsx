import Image from 'next/image'
import styles from 'styles/header.module.sass'
import basket from 'images/basket.svg'

type NavObj = {
  count: number
}
export default function Navigation({count}:NavObj) {
  return (
    <nav>
      <div className={styles.basket}>
        <Image src={basket} alt="basket" width={24} height={24}/>
        <span className="count">{count}</span>
      </div>
    </nav>
  )
}