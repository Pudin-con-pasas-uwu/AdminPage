import { Inter } from '@next/font/google'
import Layout from '../components/Layouts/Layout'
import Categories from '../components/categories'



const inter = Inter({ subsets: ['latin'] })

export default function Home (props) {

  useEffect(() => {
    if (typeof window !== 'undefined') {
    
      const token = localStorage.getItem('adminToken');
        if (!token) {
          window.location = '/';
          return false;
        }
  
      const decodedToken = jwt_decode(token);
        if (decodedToken?.data.rol !== 1) {
          window.location = '/';
          return false;
        }
      }
  }, []);

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
  