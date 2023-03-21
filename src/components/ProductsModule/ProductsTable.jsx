// table table-striped-columns (esta propiedad es la otra que queda bien)
import styles from '../../styles/ProductsTable.module.css';
import Link from "next/link"; 


const ProductsTable = (props) => {
    // console.log(props.users.rows)

  return (
    <table className="table table-dark table-striped-columns" id={styles.PaddingTopTable} >
        <thead>
            <tr>
                <th>#</th>
                <th>product name</th>
                <th>price</th>
                <th>stock</th>
                <th>short description</th>
                {/* <Link href="/ModuleProductsAdd" passHref> */}
                <a href="/ProductsModule/ProductsAdd/ModuleProductsAdd"  type="button" class="btn btn-dark" id={styles.buttonadd} >add new products</a>
                {/* <Link href="../../pages/ProductsModule.js" type="button" class="btn btn-dark" id={styles.buttonadd}>add new products</Link> */}
                {/* <button type="button" class="btn btn-dark" id={styles.buttonadd} >add new products</button> */}
                {/* </Link> */}
            </tr>
        </thead>
        <tbody>
        {Array.isArray(props.users.rows) && props.users.rows.length > 0 ?
        props.users.rows.map(user => (
            <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.product_name}</td>
                <td>{user.price}</td>
                <td>{user.stock}</td>
                <td>{user.short_desc}</td>
                <Link href={`/ProductsModule/${user.id}`} type="button" class="btn btn-dark" id={styles.bottomSpace}>details</Link>
                <button type="button" class="btn btn-dark"  id={styles.bottomSpace} >delete</button>
                <Link href={`/ProductsModule/ProductsEdit/${user.id}`} type="button" class="btn btn-dark" id={styles.bottomSpace}>edit</Link>
            </tr>
        )) : null
        }
        </tbody>
    </table>
  )
};



export default ProductsTable;