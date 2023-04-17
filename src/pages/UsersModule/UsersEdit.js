import React from 'react';
import EditUser from '@/components/UserMod/EditUser';
import Layout from '@/components/Layouts/Layout.jsx';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


const UsersEdit = () => {

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
      const res = await fetch('https://ecommerunid.sistemasdelcaribe.com/all_users');
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
          <center users={users}>
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