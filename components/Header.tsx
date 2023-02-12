import Navigation from "./Navigation"
import styles from 'styles/header.module.sass'

type HeaderObj = {
  count?: number
}
export default function Header({count=0}:HeaderObj) {
  return (
    <header className={styles.header}>
      <div className="logo">Store</div>
      <Navigation count={count}/>
    </header>
  )
}