import Navigation from "./Navigation"
import Link from "next/link"
import styles from "styles/header.module.sass"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="left"><Link href="/" style={{textDecoration:"none", color:"#eee"}}>Store</Link></div>
      <div className="right"><Navigation/></div>
    </header>
  )
}