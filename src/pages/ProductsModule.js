import React from 'react';
import Layout from '@/components/Layouts/Layout'
import ProductsTable from '@/components/ProductsModule/ProductsTable';
import SearchBar from '@/components/ProductsModule/SearchBarProductos';
import fetch from 'isomorphic-fetch'
import { useRouter } from 'next/router';




const ProductsModule = (props) =>{
    // console.log(props)
    const router = useRouter();

    if (!props.users) {
      router.reload();
      return null;
    }


  return (
    <Layout>
        <SearchBar/>
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