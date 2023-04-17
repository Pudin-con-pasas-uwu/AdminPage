import React from 'react';
import Layout from '../../../components/Layouts/Layout.jsx'
// import ProductsTableAdd from '../../../components/ProductsModule/ProductsTableAdd.jsx';
import RegisterProducts from '@/components/ProductsModule/RegisterProducts.jsx';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';





const ModuleProductsAdd = () =>{
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
          <center>
            <div>
              <div className="container checktitle">
                <h1>Add</h1>
                <p>Please fill in the fields to add a new product</p>
              </div>
            </div>
          </center>
        {/* <ProductsTableAdd /> */}
        <RegisterProducts users={users}/>
    </Layout>
  )
  
}


export default ModuleProductsAdd;