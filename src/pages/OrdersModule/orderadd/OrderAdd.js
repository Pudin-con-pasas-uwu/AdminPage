import React from 'react';
import Layout from '../../../components/Layouts/Layout.jsx'
import FormOrders from '@/components/Orders/FormOrders.jsx';
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';



const OrderAdd = (props) =>{

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
        < FormOrders  users={props.users}/>
    </Layout>
  )
  
}
OrderAdd.getInitialProps = async (ctx) => {
  try {
    const res = await fetch('https://ecommerce-unid.000webhostapp.com/products');
    const data = await res.json();
    return { users: data };
  } catch (error) {
    console.error(error);
    return { users: null };
  }
};


export default OrderAdd;