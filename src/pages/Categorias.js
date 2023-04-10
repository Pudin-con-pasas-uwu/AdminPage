import { Inter } from '@next/font/google'
import Layout from '../components/Layouts/Layout'
import Categories from '@/components/Categorias/categories'
import CategoriesTitle from '@/components/Categorias/Categories_title'
import jwt_decode from 'jwt-decode'



const inter = Inter({ subsets: ['latin'] })

export default function Home (props) {

  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem('adminToken');
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
  };

  return (
    <Layout>
      <CategoriesTitle/>
      <Categories  Categories={props.Categories}/>
    </Layout>
  )
}

Home.getInitialProps = async (ctx) =>{
    const res = await fetch('https://ecommerce-unid.000webhostapp.com/categories');
    const data = await res.json();
    return {Categories: data}
  }
  