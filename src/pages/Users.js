import React from 'react';
import fetch from 'isomorphic-fetch'
import Layout from '../components/Layouts/Layout';
import UsersMod from '../components/UserMod/UsersMod';
import UsersTitle from '../components/UserMod/UsersTitle';
import jwt_decode from 'jwt-decode'



const Users = (props) =>{
    console.log(props.users)
    

    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('adminToken');
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);
  };

  return (
    <Layout>
      <UsersTitle/>
    <UsersMod users={props.users}/>
    </Layout>
  )

}

Users.getInitialProps = async (ctx) =>{
    const res = await fetch('https://ecommerce-unid.000webhostapp.com/users');
    const data = await res.json();
    return {users: data}
}

export default Users;