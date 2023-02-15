import Navigation from "./Navigation"
import styles from 'styles/header.module.sass'

type HeaderObj = {
  basket: any
}
export default function Header({basket}:HeaderObj) {
  return (
    <header className={styles.header}>
      <div className="logo">Store</div>
      <Navigation basket={basket}/>
    </header>
  )
}