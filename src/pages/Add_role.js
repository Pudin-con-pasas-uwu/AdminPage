import { Inter } from '@next/font/google'
import Layout from '@/components/Layouts/Layout'
import Roladding from '@/components/Roles/roleadding'
import AddRolHeader from '@/components/Roles/AddRol_header'

const inter = Inter({ subsets: ['latin'] })

export default function Home () {

  return (
    <Layout>
      <AddRolHeader/>
      <Roladding/>
    </Layout>
)
}
