import { Inter } from '@next/font/google'
import Layout from '@/components/Layouts/Layout'
import Addingcat from '@/components/Categorias/Addingcat'
import AddHeader from '@/components/Categorias/add_header'
import jwt_decode from 'jwt-decode'

const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  if (typeof window !== 'undefined') {
    const token = sessionStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);

    if(decodedToken?.data.rol === 1 ){
      window.location = '/ProductsModule'
      return false;
    }
};

  return (
    <Layout>
        <AddHeader/>
        <Addingcat/>
    </Layout>
)
}