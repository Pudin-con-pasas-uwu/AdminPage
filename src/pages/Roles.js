import { Inter } from '@next/font/google'
import _fetch from 'isomorphic-fetch'
import Rolslayout from '@/components/Layouts/awdawdawd/rolslayout'
import Roles from '../components/Roles/roles'
import RolTitle from '../components/Roles/rol_title'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Rols (props) {

  //PERMISOS ->inicio<- //
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
      const res = await fetch('https://ecommerunid.sistemasdelcaribe.com/all_roles');
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
    <Rolslayout>
      <RolTitle/>
        <Roles  Roles={props.Roles} users={users}/>
    </Rolslayout>
  )
}

Rols.getInitialProps = async (ctx) =>{
    const res = await fetch('https://ecommerce-unid.000webhostapp.com/roles');
    const data = await res.json();
    return {Roles: data}
  }