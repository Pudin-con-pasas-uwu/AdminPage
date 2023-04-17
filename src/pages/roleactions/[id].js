import Layout from "@/components/Layouts/Layout";
import Roladding from "@/components/Roles/roleadding";
// Importamos el hook useRouter para poder obtener el id del query string de la URL
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-fetch'


const Roleedit = ({ rol }) => {
    console.log(rol)
    // Usamos el hook useRouter para obtener el id del query string de la URL
    const router = useRouter();
    console.log(router)
    const { id } = router.query;

  const [users, setUsers] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/');
    } else {
      fetchUsers();
    }
  }, [router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('https://ecommerunid.sistemasdelcaribe.com/all_roles');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

    if (!users) {
      return null;
    }
    return (
        // Renderizamos el componente Layout
        <Layout>
          <main >
              <div className="container text-center">
                <h3>Ahora mismo estás editando:</h3>
                <h2>{rol.name}</h2>
              </div>
              <Roladding users={users}/>
    
          </main>
        </Layout>
    )
}

Roleedit.getInitialProps = async (ctx) => {
    try {
        // Hacemos una petición al API para obtener los detalles del producto con el id especificado en el query string de la URL
        const res = await fetch(`https://ecommerunid.sistemasdelcaribe.com/one_role/${ctx.query.id}`)
        const resJSON = await res.json();
        // Retornamos los detalles del producto como props
        return { rol: resJSON }
    } catch (error) {
        console.error(error)
        // Si hay algún error, retornamos un mensaje de error
        return { errorMessage: 'Hubo un problema al cargar los datos' }
    }
}

export default Roleedit;