import React from 'react';
import fetch from 'isomorphic-fetch'
import Layout from '../components/Layouts/Layout';
import UsersMod from '../components/UserMod/UsersMod';
import UsersTitle from '../components/UserMod/UsersTitle';
import jwt_decode from 'jwt_decode';


const Users = (props) =>{
    console.log(props.users)

    const router = useRouter();
    
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);

      if(decodedToken?.data.rol !== 1){
        window.location = '/'
        return false;
      };
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