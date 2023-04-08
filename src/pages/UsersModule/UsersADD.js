import React from 'react';
import FormUser from '@/components/UserMod/FormUser.jsx';
import Layout from '@/components/Layouts/Layout.jsx';

const UsersADD = () => {
    return (
<Layout>
          <center>
              <div className="container">
                <h1>Add</h1>
                <p>Please fill in the fields to add a new user</p><br/>
              </div>
          </center>
        <FormUser />
    </Layout>
    );
}

export default UsersADD;
