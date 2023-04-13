import React from 'react'
import Layout from '@/components/Layouts/Layout'
import { useRouter } from "next/router";
import OrderUpdate from '../../../components/Orders/OrderUpdate'

const order_update = (props) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    console.log(router);
    const { id } = router.query;

    if (!props) {
        router.reload();
        return null;
    }

    if (typeof window !== 'undefined') {
        const token = sessionStorage.getItem("token");
    };

  return (

    <Layout>
        <OrderUpdate  order_detail={props.order_detail} order_id={id}/>
    </Layout>
  )
  
}

order_update.getInitialProps = async (ctx) => {
    const URL = 'https://ecommerce-unid.000webhostapp.com/order_detail'
        const res = await fetch(URL)
        const data = await res.json()
        return {
          order_detail: data    
        }
  }
  export default order_update