import { Inter } from '@next/font/google'
import Layout from '../components/Layouts/Layout'
import Categories from '../components/categories'



const inter = Inter({ subsets: ['latin'] })

export default function Home (props) {

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken');
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
  };

  return (
    <Layout>
        <Categories  Categories={props.Categories}/>
    </Layout>
  )
}

Home.getInitialProps = async (ctx) =>{
    const res = await fetch('https://ecommerce-unid.000webhostapp.com/categories');
    const data = await res.json();
    return {Categories: data}
  }
  