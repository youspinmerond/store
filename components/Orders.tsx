interface Order {
  order: {
    id: number
    fullname: string
    phone: string
    city: string
    address: string
    verefied: boolean
    products_info: any
  }
}

export default function Orders({order}:Order) {
  return (
    <>
      <td>{order.id}</td>
      <td>{order.fullname}</td>
      <td>{order.phone}</td>
      <td>{order.city}</td>
      <td>{order.address}</td>
      <td><b>{order.verefied ? 'yes' : 'no'}</b></td>
      <td>{order.products_info.join(", ")}</td>
    </>
  )
}