/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Layout from '@/components/Layouts/Layout'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import OrderDetail from '../../../components/Orders/OrderDetail'

const order_detail = (props) => {

  const router = useRouter();
  const { id } = router.query;
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
      const res = await fetch('https://ecommerunid.sistemasdelcaribe.com/all_order_details');
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
        <OrderDetail  order_detail={props.order_detail} order_id={id} users={users}/>
    </Layout>
  )
  
}

order_detail.getInitialProps = async (ctx) => {
    const URL = 'https://ecommerunid.sistemasdelcaribe.com/all_order_details'
        const res = await fetch(URL)
        const data = await res.json()
        return {
          order_detail: data    
        }
  }
  export default order_detail