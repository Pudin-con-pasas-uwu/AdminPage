import React from 'react';
import FormUser from '@/components/UserMod/FormUser.jsx';
import Layout from '@/components/Layouts/Layout.jsx';

const UsersADD = () => {
    return (
<Layout>
          <center>
              <div className="container">
                <h1>Agregar</h1>
                <p>Rellene el formulario para añadir un nuevo usuario</p><br/>
              </div>
          </center>
        <FormUser />
    </Layout>
    );
}

export default UsersADD;
