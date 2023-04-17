import { Inter } from '@next/font/google'
import Layout from '@/components/Layouts/Layout'
import Roladding from '@/components/Roles/roleadding'
import AddRolHeader from '@/components/Roles/AddRol_header'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home () {

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
      const res = await fetch('https://ecommerunid.sistemasdelcaribe.com/one_rol');
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
      <AddRolHeader user={users}/>
      <Roladding user={users}/>
    </Layout>
)
}
