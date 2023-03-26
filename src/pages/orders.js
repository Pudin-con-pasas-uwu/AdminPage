import fetch from 'isomorphic-fetch'
import Layout from '../components/Layouts/Layout'
import OrdersMod from '../components/OrdersMod'
import jwt_decode from 'jwt_decode'

const orders = (props) => {

  console.log(props.orders)

  const router = useRouter();
    
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);

      if(decodedToken?.data.rol !== 1){
        window.location = '/'
        return false;
      };
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