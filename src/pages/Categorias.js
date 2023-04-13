import { Inter } from '@next/font/google'
import Layout from '../components/Layouts/Layout'
import Categories from '@/components/Categorias/categories'
import CategoriesTitle from '@/components/Categorias/Categories_title'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'


const inter = Inter({ subsets: ['latin'] })

export default function Home (props) {

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
      <CategoriesTitle/>
      <Categories  Categories={props.Categories} users={users}/>
    </Layout>
  )
}

Home.getInitialProps = async (ctx) =>{
    const res = await fetch('https://ecommerce-unid.000webhostapp.com/categories');
    const data = await res.json();
    return {Categories: data}
  }
  