import { Inter } from '@next/font/google'
import Layout from '@/components/Layouts/Layout'




const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  return (
    <Layout>
      <h1> hola mundo</h1>
    </Layout>
  )
}