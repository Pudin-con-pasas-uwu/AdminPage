// table table-striped-columns (esta propiedad es la otra que queda bien)
import styles from '../../styles/ProductsTable.module.css';
import Link from "next/link"; 
import { useState } from 'react';
import Image from "next/image";
import Ejemplo from "../../img/Ejemplo.jpg";
// import SearchBar from './SearchBarProductos';

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
                    
                    <th colspan="7">
                        <form onSubmit={(event) => event.preventDefault()} >
                            <input id='ordenamiento' class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchQueryChange}
                            />
                        </form>
                    </th>          
                    <th colspan="1">
                        <select value={sortOrder} onChange={handleSortChange} id='ordenamiento'  class="form-select form-select " >
                        <option value="">Sort by:</option>
                    <option value="ascName">A-Z</option> 
                    <option value="descName">Z-A</option>
                    <option value="descDate">Oldest</option>
                    <option value="ascDate">Newest</option>
                        </select>
                    </th>
                    <th colspan="2">
                      <Link href="/ProductsModule/ProductsAdd/ModuleProductsAdd" type="button" class="btn btn-dark" id={styles.buttonadd}>ADD</Link>
                    </th>
                </tr>
                <tr>
                    <th>#</th>
                    <th>image</th>
                    <th>category</th>
                    <th>product name</th>
                    <th>price</th>
                    <th>stock</th>
                    <th>short description</th>
                    <th>description</th>
                    <th>date creation</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {Array.isArray(props.users.rows) && props.users.rows.length > 0 ?
            sortedRows().map((user) => (
                <tr key={user.id}>
                    <th>{user.id}</th>
                    <th id={styles.ContentImg}>
                      <Image src={Ejemplo} class="img-fluid" alt="imagen del producto" id={styles.SiceImg} /> 
                    </th>
                    <th id={styles.TextAlainCenter} >{user.category_id}</th>
                    <td>{user.product_name}</td>
                    <td>${user.price}.MNX</td>
                    <td id={styles.TextAlainCenter} >{user.stock}</td>
                    <td id={styles.TextRecortShortDescription} >{user.short_desc}</td>
                    <td id={styles.TextRecortDescription} >{user.description}</td>
                    <td>{user.creation_date}</td>
                    <td>
                        {/* <Link href={`/ProductsModule/${user.id}`} type="button" class="btn btn-dark" id={styles.bottomSpace}>details</Link> */}
                        <button type="button" class="btn btn-danger"  id={styles.bottomSpace} >delete</button>
                        <Link href={`/ProductsModule/ProductsEdit/${user.id}`} type="button" class="btn btn-dark" id={styles.bottomSpace}>edit</Link>
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



export default ProductsTable;