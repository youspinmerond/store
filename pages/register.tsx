import styles from 'styles/auth.module.sass'

export default function Register() {
  
  function onSubmit(e:any) {
    e.preventDefault()

    const prepareData:string = JSON.stringify({
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      password2: e.target.password2.value,
    })

    fetch("http://localhost:3000/api/auth/register", {
      method:"POST",
      mode:"no-cors",
      headers:{
        "Content-Type":"text/plain"
      },
      body: prepareData
    })
      .then(res => res.json())
      .then(res => console.log(res))

    return e
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <form onSubmit={onSubmit} className={styles.form} method="post" action=''>
          <div className={styles.formElem}>
            <label>userName</label>
            <input type="text" name="name" placeholder="username" required/>
          </div>
          <div className={styles.formElem}>
            <label>eMail</label>
            <input type="email" name="email" placeholder="e-mail" required/>
          </div>
          <div className={styles.formElem}>
            <label>passWord</label>
            <input type="password" name="password" placeholder="password" required/>
            <input type="password" name="password2" placeholder="password one more time" required/>
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