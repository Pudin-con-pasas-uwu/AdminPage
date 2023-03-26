// seccion de css

import '../styles/globals.css'
import '../styles/About.css'
import '../styles/rol_table.css'
import '../styles/Users_Mod.css'


import { Montserrat } from 'next/font/google'


const montserrat = Montserrat({
  weight:['400'],
  subsets: ['latin'],
})


export default function App({ Component, pageProps }) {
//--> PROBLEMA: La hidratación ha fallO porque IU inicial
//no coincide con lo que se muestra en el servidor.<--//

//-->SOLUCION: Esto hace que la aplicacion se renderice<--//
  
  const [showChild, setShowChild] = useState(false); 
  //RETRASA LA HIDRATACIÓN //
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  //utiliza el gancho useEffect para establecer el valor de showChild en true después de montar el componente.
  //Esto asegura que los componentes hijos no se rendericen hasta que se haya montado completamente.

  if(typeof window === 'undefined'){
    return <></>
  }
  
  //si el código se está ejecutando en el servidor o en el navegador.
  //Si el código se está ejecutando en el servidor (es decir, typeof window === 'undefined'),
  //el componente devuelve un fragmento vacío (<>...</>).
  //Esto se debe a que el componente Proveedor sólo debe renderizarse en el lado del cliente.
  
  else {
  return(
    <main className={montserrat.className}>
      <Component {...pageProps} />
    </main>

    // Si el código se ejecuta en el navegador, el componente MyApp devuelve el componente Provider
    //con el Component y pageProps pasados como props.
    //Esto asegura que el almacén Redux está disponible para todos los componentes hijos en el lado del cliente. //

    ) 
  }
}
