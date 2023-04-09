import React from 'react';
import Layout from '../components/Layouts/Layout'
import ProductsTable from '../components/ProductsModule/ProductsTable';
import fetch from 'isomorphic-fetch'
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode'


const ProductsModule = (props) =>{
    // console.log(props)
    const router = useRouter();

    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);

      if(decodedToken?.data.rol === 1 ){
        window.location = '/ProductsModule'
        return false;
      }
  };

    if (!props.users) {
      router.reload();
      return null;
    }


  return (
    <Layout>
        <ProductsTable users={props.users} />
    </Layout>
  )
  
}

ProductsModule.getInitialProps = async (ctx) =>{
  try {
    const res = await fetch('https://ecommerce-unid.000webhostapp.com/products');
    const data = await res.json();
    return {users: data}
  }catch(error) {
    console.error(error);
    return {users: null };
  }
  };

  

export default ProductsModule;