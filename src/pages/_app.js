// seccion de css
import '@/styles/globals.css'
import '@/styles/About.css'
import '@/styles/rol_table.css'

import { Montserrat } from 'next/font/google'


const montserrat = Montserrat({
  weight:['400'],
  subsets: ['latin'],
})


export default function App({ Component, pageProps }) {
  return(
    <main className={montserrat.className}>
      <Component {...pageProps} />
    </main>

  ) 
}
