import fetch from 'isomorphic-fetch'
import Layout from '../components/Layouts/Layout'
import OrdersMod from '../components/OrdersMod'


const orders = (props) => {

  console.log(props.orders)

  useEffect(() => {
    if (typeof window !== 'undefined') {
    
      const token = localStorage.getItem('adminToken');
        if (!token) {
          window.location = '/';
          return false;
        }
  
      const decodedToken = jwt_decode(token);
        if (decodedToken?.data.rol !== 1) {
          window.location = '/';
          return false;
        }
      }
  }, []);

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