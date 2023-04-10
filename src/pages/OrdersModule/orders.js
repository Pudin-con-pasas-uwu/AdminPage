import fetch from 'isomorphic-fetch'
import Layout from '../../components/Layouts/Layout'
import OrdersMod from '../../components/Orders/OrdersMod'
import OrderDetail from '../../components/Orders/OrderDetail'
import jwt_decode from 'jwt-decode'


const orders = (props) => {

  console.log(props.orders)
  console.log(props.order_detail)

  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('adminToken');
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
  };

  return (
    <Layout>
      <OrdersMod orders={props.orders}/>
      <OrderDetail order_detail={props.order_detail} orders={props.orders}/>
    </Layout>
  )
}

orders.getInitialProps = async (ctx) => {
  const URL1 = 'https://ecommerce-unid.000webhostapp.com/orders'
      const res1 = await fetch(URL1)
      const data1 = await res1.json()
  const URL2 = 'https://ecommerce-unid.000webhostapp.com/order_detail'
      const res2 = await fetch(URL2)
      const data2 = await res2.json()
      return {
        orders: data1,
        order_detail: data2    
      }
}

export default orders;
