import React from 'react';
import fetch from 'isomorphic-fetch'
import Layout from '../components/Layouts/Layout';
import UsersMod from '../components/UserMod/UsersMod';
import UsersTitle from '../components/UserMod/UsersTitle';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';



const Users = (props) =>{
    console.log(props.users)
    
    //PERMISOS ->inicio<-//
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
  //PERMISOS ->fin<- (incluye users={users})//

  return (
    <Layout>
      <UsersTitle />
      <UsersMod users={users} />
    </Layout>
  );

}

Users.getInitialProps = async (ctx) =>{
    const res = await fetch('https://ecommerce-unid.000webhostapp.com/users');
    const data = await res.json();
    return {users: data}
}

export default Users;