import { Inter } from '@next/font/google'
import Rolslayout from '../components/Layouts/rolslayout'
import Roles from '../components/Roles/roles'
import RolTitle from '../components/Roles/rol_title'


const inter = Inter({ subsets: ['latin'] })

export default function Rols (props) {
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