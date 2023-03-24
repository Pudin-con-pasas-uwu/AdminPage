// table table-striped-columns (esta propiedad es la otra que queda bien)
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
        <table className="table table-striped table-hover table-responsive" id={styles.PaddingTopTable} >
        <thead>
            <tr>
                <th></th>
                <th>
                    <form onSubmit={(event) => event.preventDefault()} >
                        <input id='ordenamiento' class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                            value={searchQuery}
                            onChange={handleSearchQueryChange}
                        />
                    </form>
                </th>
                <th colspan="2">
                    <select value={sortOrder} onChange={handleSortChange} id='ordenamiento'  class="form-select form-select " >
                    <option value="">Sort by:</option>
                <option value="ascName">A-Z</option> 
                <option value="descName">Z-A</option>
                <option value="descDate">Oldest</option>
                <option value="ascDate">Newest</option>
                    </select>
                </th>
                <th>
                    {/* <form onSubmit={(event) => event.preventDefault()} >
                        <input id='ordenamiento' class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                            value={searchQuery}
                            onChange={handleSearchQueryChange}
                        />
                    </form> */}
                </th>
                <th>
                  <Link href="#" type="button" class="btn btn-dark" id={styles.buttonadd}>add new products</Link>
                  {/* <Link href="/ProductsModule/ProductsAdd/ModuleProductsAdd" type="button" class="btn btn-dark" id={styles.buttonadd}>add new products</Link> */}
                
                </th>
            </tr>
            <tr>
                <th>#</th>
                <th>product name</th>
                <th>price</th>
                <th>stock</th>
                <th>short description</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {Array.isArray(props.users.rows) && props.users.rows.length > 0 ?
        sortedRows().map((user) => (
            <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.product_name}</td>
                <td>{user.price}</td>
                <td>{user.stock}</td>
                <td>{user.short_desc}</td>
                <td>
                    <Link href="#" type="button" class="btn btn-dark" id={styles.bottomSpace}>details</Link>
                    {/* <Link href={`/ProductsModule/${user.id}`} type="button" class="btn btn-dark" id={styles.bottomSpace}>details</Link> */}
                    <button type="button" class="btn btn-danger"  id={styles.bottomSpace} >delete</button>
                    <Link href="#" type="button" class="btn btn-dark" id={styles.bottomSpace}>edit</Link>
                    {/* <Link href={`/ProductsModule/ProductsEdit/${user.id}`} type="button" class="btn btn-dark" id={styles.bottomSpace}>edit</Link>             */}
                </td>
            </tr>
        )) : null
    }
        </tbody>
    </table>
    </>
  )
};



export default ProductsTable;