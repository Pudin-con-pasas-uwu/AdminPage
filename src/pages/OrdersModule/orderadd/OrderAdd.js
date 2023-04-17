import React from 'react';
import Layout from '../../../components/Layouts/Layout.jsx'
import FormOrders from '@/components/Orders/FormOrders.jsx';



const OrderAdd = (props) =>{
  
  if (!props.users) {
    router.reload();
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