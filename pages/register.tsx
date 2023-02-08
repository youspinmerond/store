import styles from 'styles/auth.module.sass'

export default function Register() {
  return (
    <div>
      <div className={styles.wrapper}>
        <form action="" className={styles.form}>
          <div className={styles.formElem}>
            <label>userName</label>
            <input type="text" name="name" placeholder="username"/>
          </div>
          <div className={styles.formElem}>
            <label>eMail</label>
            <input type="email" name="email" placeholder="e-mail"/>
          </div>
          <div className={styles.formElem}>
            <label>passWord</label>
            <input type="password" name="password" placeholder="password"/>
          </div>
          <div className={styles.spacer}></div>
          <div className={styles.formElem} style={{display:"flex",justifyContent:"center"}}>
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}