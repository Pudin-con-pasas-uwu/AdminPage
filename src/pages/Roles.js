import { Inter } from '@next/font/google'
import _fetch from 'isomorphic-fetch'
import Rolslayout from '@/components/Layouts/awdawdawd/rolslayout'
import Roles from '../components/Roles/roles'
import RolTitle from '../components/Roles/rol_title'
import jwt_decode from 'jwt_decode';


const inter = Inter({ subsets: ['latin'] })

export default function Rols (props) {

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
    <Rolslayout>
      <RolTitle/>
        <Roles  Roles={props.Roles}/>
    </Rolslayout>
  )
}

Rols.getInitialProps = async (ctx) =>{
    const res = await fetch('https://ecommerce-unid.000webhostapp.com/users');
    const data = await res.json();
    return {Roles: data}
  }