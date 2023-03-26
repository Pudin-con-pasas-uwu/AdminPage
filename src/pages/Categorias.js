import { Inter } from '@next/font/google'
import Layout from '../components/Layouts/Layout'
import Categories from '../components/categories'
import jwt_decode from 'jwt_decode';



const inter = Inter({ subsets: ['latin'] })

export default function Home (props) {

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
        <Categories  Categories={props.Categories}/>
    </Layout>
  )
}

Home.getInitialProps = async (ctx) =>{
    const res = await fetch('https://ecommerce-unid.000webhostapp.com/categories');
    const data = await res.json();
    return {Categories: data}
  }
  