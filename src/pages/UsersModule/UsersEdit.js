import React from 'react';
import EditUser from '@/components/UserMod/EditUser';
import Layout from '@/components/Layouts/Layout.jsx';

const UsersEdit = () => {
    return (
<Layout>
          <center>
              <div className="container">
                <h1>Add</h1>
                <p>Please fill in the fields to edit the user</p><br/>
              </div>
          </center>
        <EditUser />
    </Layout>
    );
}

export default UsersEdit;