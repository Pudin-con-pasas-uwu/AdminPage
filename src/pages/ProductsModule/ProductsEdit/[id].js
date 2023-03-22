import Layout from '@/components/Layouts/Layout'
// Importamos el hook useRouter para poder obtener el id del query string de la URL
import { useRouter } from "next/router";
import fetch from 'isomorphic-fetch'
import ProductsTableEdit from '@/components/ProductsModule/ProductsTableEdit'; 

const DetaillProducts = ({ user }) => {
    console.log(user)
    // Usamos el hook useRouter para obtener el id del query string de la URL
    const router = useRouter();
    console.log(router)
    const { id } = router.query;

    if (!user) {  //aqui ya no se usa el props
        router.reload();
        return null;
    }

    return (
        // Renderizamos el componente Layout
        <Layout>
          <center>
            <div>
              <div className="container checktitle">
                <h1>Edit</h1>
                <p>Please enter the changes</p>
              </div>
            </div>
          </center>
            <ProductsTableEdit />
        </Layout>
    )
}

DetaillProducts.getInitialProps = async (ctx) => {
    try {
        // Hacemos una petición al API para obtener los detalles del producto con el id especificado en el query string de la URL
        const res = await fetch(`https://ecommerce-unid.000webhostapp.com/products/${ctx.query.id}`)
        const resJSON = await res.json();
        // Retornamos los detalles del producto como props
        return { user: resJSON }
    } catch (error) {
        console.error(error)
        // Si hay algún error, retornamos un mensaje de error
        return { errorMessage: 'Hubo un problema al cargar los datos' }
    }
}

export default DetaillProducts;