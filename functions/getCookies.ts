export default function getCookies(cookie:string | undefined) {
  if(cookie === undefined) return 'mistake'
  
  let cookies:string[] = cookie.split('; ')

  const result = cookies.map(e => {
    return e.split('=')
  })
  
  return Object.fromEntries(result)
}