export default function Validator(email:string) {
  const isEmail = email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null ? false : true
  return isEmail
}