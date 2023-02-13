import Header from 'components/Header'
import Products from 'components/Products'
import styles from '@/styles/Home.module.sass'

export default function Home(list:any) {
  return (
    <>
      <main className={styles.main}>
        <Header/>
        <Products list={list} />
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const list = await fetch("http://localhost:3000/api/getProducts")
    .then(list => list.json())
  
  return {
    props: {
      list: list
    }
  }
}