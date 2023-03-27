import fetch from 'isomorphic-fetch'
import Layout from '../components/Layouts/Layout'
import OrdersMod from '../components/OrdersMod'


const orders = (props) => {

  console.log(props.orders)

  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem("token");
};

  return (
    <Layout>
      <OrdersMod orders={props.orders}/>
    </Layout>
  )
}

orders.getInitialProps = async (ctx) => {
  const URL = 'https://ecommerce-unid.000webhostapp.com/order_detail'
      const response = await fetch(URL)
      const data = await response.json()
      return {orders: data}
}

export default orders;