import React from 'react';
import Layout from '../components/Layouts/Layout'
import ProductsTable from '../components/ProductsModule/ProductsTable';
import fetch from 'isomorphic-fetch'
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';


const ProductsModule = (props) =>{
     console.log(props)
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
      const res = await fetch('https://ecommerunid.sistemasdelcaribe.com/all_products');
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
        <ProductsTable users={props.users} category={props.category}  />
    </Layout>
  )
  
}

ProductsModule.getInitialProps = async (ctx) =>{
  try {
    const res2 = await fetch('https://ecommerunid.sistemasdelcaribe.com/all_categories');
    const data2 = await res2.json();
    const res = await fetch('https://ecommerunid.sistemasdelcaribe.com/all_products');
    const data = await res.json();
    return {users: data, category: data2}
  }catch(error) {
    console.error(error);
    return {users, category: null };
  }
  };

  

export default ProductsModule;