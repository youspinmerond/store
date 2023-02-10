import styles from 'styles/auth.module.sass'

export default function Register() {
  function onSubmit(e:any) {
    e.preventDefault()

    const prepareData:string = JSON.stringify({
      name_email: e.target.name_email.value,
      password: e.target.password.value
    })

    fetch("http://localhost:3000/api/auth/login", {
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
            <label>userName or eMail</label>
            <input type="text" name="name_email" placeholder="username or email" required/>
          </div>
          <div className={styles.formElem}>
            <label>passWord</label>
            <input type="password" name="password" placeholder="password" required/>
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

export async function getServerSideProps({req}:any) {
  
  const a = await fetch("http://localhost:3000/api/auth", {
    headers: {
      Cookie: req.headers.cookie
    }
  })
  // console.log(a)
    
  return {
    props:{}
  }
}