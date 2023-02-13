export default function Admin() {
  return (
    <div>
      <h1>Admin Page1</h1>
    </div>
  )
}

export async function getServerSideProps(ctx:any) {

  let res = await fetch('http://localhost:3000/api/getCookies', {
    credentials: 'same-origin',
    headers: {
      Cookie: ctx.req.headers.cookie
    }
  })
  const handledres = await res.json()
  console.log(handledres)

  return {
    props: {

    }
  }
}