// table table-striped-columns (esta propiedad es la otra que queda bien)
import styles from '../../styles/ProductsTable.module.css';


const ProductsTable = (props) => {
    // console.log(props.users.rows)

  return (
    <table className="table table-dark table-striped-columns" id={styles.PaddingTopTable} >
        <thead>
            <tr>
                <th>#</th>
                <th>category #</th>
                <th>product name</th>
                <th>price</th>
                <th>stock</th>
                <th>short description</th>
                <th>description</th>
                <th>image</th>
            </tr>
        </thead>
        <tbody>
        {Array.isArray(props.users.rows) && props.users.rows.length > 0 ?
        props.users.rows.map(user => (
            <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.category_id}</td>
                <td>{user.product_name}</td>
                <td>{user.price}</td>
                <td>{user.stock}</td>
                <td>{user.short_desc}</td>
                <td>{user.description}</td>
                <td>{user.image}</td>
            </tr>
        )) : null
        }
        </tbody>
    </table>
  )
};



export default ProductsTable;