import React from 'react';
import Layout from '@/components/Layouts/Layout'
import ProductsTable from '@/components/ProductsModule/ProductsTable';
import fetch from 'isomorphic-fetch'



const ProductsModule = (props) =>{
    console.log(props)


  return (
    <Layout>
        <ProductsTable users={props.users} />
    </Layout>
  )
  
}

ProductsModule.getInitialProps = async (ctx) =>{
    const res = await fetch('https://ecommerce-unid.000webhostapp.com/products');
    const data = await res.json();
    return {users: data}
  }

export default ProductsModule;