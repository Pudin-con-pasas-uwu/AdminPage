import React from 'react';
import Layout from '../../../components/Layouts/Layout.jsx'
// import ProductsTableAdd from '../../../components/ProductsModule/ProductsTableAdd.jsx';
import RegisterProducts from '@/components/ProductsModule/RegisterProducts.jsx';






const ModuleProductsAdd = () =>{
 


  return (
    <Layout>
          <center>
            <div>
              <div className="container checktitle">
                <h1>Añadir</h1>
                <p>Por favor complete los campos para agregar un nuevo producto</p>
              </div>
            </div>
          </center>
        {/* <ProductsTableAdd /> */}
        <RegisterProducts />
    </Layout>
  )
  
}


export default ModuleProductsAdd;