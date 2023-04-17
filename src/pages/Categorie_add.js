import { Inter } from '@next/font/google'
import Layout from '@/components/Layouts/Layout'
import Addingcat from '@/components/Categorias/Addingcat'
import AddHeader from '@/components/Categorias/add_header'
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
      const res = await fetch('https://ecommerunid.sistemasdelcaribe.com/all_categories');
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
        <AddHeader users={users}/>
        <Addingcat users={users}/>
    </Layout>
)
}