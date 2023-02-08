import Link from "next/link"
import styles from "styles/nav.module.sass"

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className="lig">log in</div>
      <div className="sign"><Link href="/register" style={{textDecoration:"none", color:"#eee"}}>sign in</Link></div>
    </nav>
  )
}