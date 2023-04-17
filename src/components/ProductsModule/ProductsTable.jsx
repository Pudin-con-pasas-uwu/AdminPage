import styles from '../../styles/ProductsTable.module.css';
import Link from "next/link"; 
import { useState } from 'react';

const ProductsTable = (props) => {
    // console.log(props.users.rows)

    const [sortOrder, setSortOrder] = useState('');
    const [searchQuery, setSearchQuery]  = useState('');
  
    const handleSortChange = (event) => {
      setSortOrder(event.target.value);
    };
  
    const handleSearchQueryChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
  
    const sortedRows = () => {
      let rows = [...props.users.rows];
    
      switch (sortOrder) {
        case 'ascName':
          rows.sort((a, b) => a.product_name.localeCompare(b.product_name));
          break;
        case 'descName':
          rows.sort((a, b) => b.product_name.localeCompare(a.product_name));
          break;
        case 'ascDate':
          rows.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
          break;
        case 'descDate':
          rows.sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));
          break;
        default:
          break;
      }
    
      if (searchQuery) {
        rows = rows.filter((row) => {
          const nameMatch = row.product_name.toLowerCase().includes(searchQuery.toLowerCase());
          const usernameMatch = row.short_desc.toLowerCase().includes(searchQuery.toLowerCase());
          const emailMatch = row.price.toLowerCase().includes(searchQuery.toLowerCase());
  
          return nameMatch || usernameMatch || emailMatch;
        });
      }
    
      return rows;
    };
  

  return (
    <>
        <div className='text-center'>
          <h3>Products</h3>
        </div>
        <div className='table-responsive-xxl'>
          <table className="table table-striped table-hover" id={styles.PaddingTopTable} >
            <thead>
                <tr>
                    <th colspan="6">
                        <form onSubmit={(event) => event.preventDefault()} >
                            <input id='ordenamiento' class="form-control me-2" type="search" placeholder="Buscar:" aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchQueryChange}
                            />
                        </form>
                    </th>          
                    <th colspan="3">
                        <select value={sortOrder} onChange={handleSortChange} id='ordenamiento'  class="form-select form-select " >
                        <option value="">Ordenar por:</option>
                    <option value="ascName">A-Z</option> 
                    <option value="descName">Z-A</option>
                    <option value="descDate">Más antiguo</option>
                    <option value="ascDate">Más nuevo</option>
                        </select>
                    </th>
                    <th colspan="2">
                      <Link href="/ProductsModule/ProductsAdd/ModuleProductsAdd" type="button" class="btn btn-dark" id={styles.buttonadd}>Añadir</Link>
                    </th>
                </tr>
                <tr  style={{ textAlign: "center" }}>
                    <th>#</th>
                    <th>imagen</th>
                    <th>categorias</th>
                    <th>nombre del producto</th>
                    <th>precio</th>
                    <th>stock</th>
                    <th>descripción corta</th>
                    <th>descripción</th>
                    <th>fecha de creacion</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                                      {/* ////////////////////////////isArray//////////////////////////// */}
            {Array.isArray(props.users.rows) && props.users.rows.length > 0 ?
            sortedRows().map((user) => (
                <tr key={user.id}  style={{ textAlign: "center" }}>
                    <th>{user.id}</th>
                    <th id={styles.ContentImg}>
                    <img src={`/imgs/${user.id}.jpg` } class="img-fluid" alt="imagen del producto" id={styles.SiceImg}  />
                      {/* <Image src={Ejemplo} class="img-fluid" alt="imagen del producto" id={styles.SiceImg} />  */}
                    </th>
                    
                                      {/* ////////////////////////////categorias////////////////////////////  */}
            <td>
                    {user.category_id.toString() === '1' ? 'Furyuu' : 
                     user.category_id.toString() === '2' ? 'Nendoroid' :
                     user.category_id.toString() === '3' ? 'Good Smile Company' :
                     user.category_id.toString() === '4' ? 'POP UP PARADE' :
                     user.category_id.toString() === '5' ? 'Taito' :
                     user.category_id.toString() === '6' ? 'Banpresto' :
                     user.category_id.toString() === '7' ? 'Mangas' : 
                     user.category_id.toString() === '8' ? 'Funko' : ''}
            </td>
                    {/* <th id={styles.TextAlainCenter} >{user.category_id}</th> */}
                    <td>{user.product_name}</td>
                    <td>${user.price}.MNX</td>
                    <td id={styles.TextAlainCenter} >{user.stock}</td>
                    <td id={styles.TextRecortShortDescription} >
                      {/* <abbr title={user.description}  id={styles.TextDecorationAbbr}> */}
                        {user.short_desc}
                      {/* </abbr> */}
                    </td>
                    <td id={styles.TextRecortDescription} >{user.description}</td>
                    <td>{user.creation_date}</td>
                    <td>
                        <button type="button" class="btn btn-danger"  id={styles.bottomSpace} onClick={() => deleteData(user.id)}>eliminar</button>
                        <Link href={`/ProductsModule/ProductsEdit/${user.id}`} key={user.id}>
                          <button type="button" class="btn btn-dark" id={styles.bottomSpace}>Editar</button>  
                        </Link>
                    </td>
                </tr>
            )) : null
        }
          </tbody>
      </table>
    </div>
  </>
  )
};

const deleteData = async(id) => {
  try {
    await fetch(`https://ecommerunid.sistemasdelcaribe.com/all_products/${id}`, {
      method: 'DELETE'
    })
  } catch (error) {
    console.log(error)
  }
}

export default ProductsTable;