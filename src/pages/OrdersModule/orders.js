import fetch from 'isomorphic-fetch'
import Layout from '../../components/Layouts/Layout'
import OrdersMod from '../../components/Orders/OrdersMod'
import OrderDetail from '../../components/Orders/OrderDetail'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'

const orders = (props) => {

  console.log(props.orders)
  console.log(props.order_detail)

  const router = useRouter();
  const [users, setUsers] = useState(null);

useEffect(() => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    router.push('/');
  } else {
    fetchUsers();
  }
}, [router]);

const fetchUsers = async () => {
  try {
    const res = await fetch('https://ecommerunid.sistemasdelcaribe.com/all_orders');
    const data = await res.json();
    setUsers(data);
  } catch (error) {
    console.error(error);
  }
};

  if (!users) {
    return null;
  }

  return (
    <Layout>
      <OrdersMod orders={props.orders} users={users}/>
      <OrderDetail order_detail={props.order_detail} orders={props.orders} users={users}/>
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
