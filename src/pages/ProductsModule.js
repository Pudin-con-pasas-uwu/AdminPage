import React, { useEffect } from 'react';
import Layout from '../components/Layouts/Layout'
import ProductsTable from '../components/ProductsModule/ProductsTable';
import fetch from 'isomorphic-fetch';
import jwt_decode from 'jwt-decode'



const ProductsModule = (props) =>{
    // console.log(props)

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