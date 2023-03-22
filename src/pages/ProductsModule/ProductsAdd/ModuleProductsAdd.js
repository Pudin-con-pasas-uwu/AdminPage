import React from 'react';
import Layout from '@/components/Layouts/Layout'
// import Layout from '../components/Layouts/Layout'
import ProductsTableEdit from '../components/ProductsModule/ProductsTableEdit';






const ModuleProductsAdd = () =>{
 


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
        <ProductsTableEdit />
    </Layout>
  )
  
}


export default ModuleProductsAdd;