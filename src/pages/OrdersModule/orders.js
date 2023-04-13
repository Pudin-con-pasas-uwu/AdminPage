/* eslint-disable react-hooks/rules-of-hooks */
import fetch from 'isomorphic-fetch'
import Layout from '../../components/Layouts/Layout'
import OrdersMod from '../../components/Orders/OrdersMod'
import OrderDetail from '../../components/Orders/OrderDetail'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const orders = (props) => {


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
      const res = await fetch('https://ecommerunid.sistemasdelcaribe.com/all_users');
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
      <OrdersMod orders={props.orders}/>
      <OrderDetail order_detail={props.order_detail} orders={props.orders}/>
    </Layout>
  )
}

orders.getInitialProps = async (ctx) => {
  const URL1 = 'https://ecommerunid.sistemasdelcaribe.com/all_orders'
      const res1 = await fetch(URL1)
      const data1 = await res1.json()
  const URL2 = 'https://ecommerunid.sistemasdelcaribe.com/all_order_details'
      const res2 = await fetch(URL2)
      const data2 = await res2.json()
      return {
        orders: data1,
        order_detail: data2    
      }
}

export default orders;
