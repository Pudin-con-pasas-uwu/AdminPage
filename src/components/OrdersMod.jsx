
import React, {useState} from 'react';

//--------------------------------------------------
//librerias que no se usaran por el momento
// import PropTypes from 'prop-types';
//--------------------------------------------------

const Orders = (props) => {
const [sortOrder, setSortOrder] = useState('');
const [searchQuery, setSearchQuery]  = useState('');

const handleSortChange = (event) => {
setSortOrder(event.target.value);
}; 

const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
};


const sortedRows = () => {
    let rows = [...props.orders.rows];
  
    switch (sortOrder) {
      case 'ascID':
        rows.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case 'descID':
        rows.sort((a, b) => b.id.localeCompare(a.id));
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
        const idMatch = row.id.toLowerCase().includes(searchQuery.toLowerCase());
        const productMatch = row.product_id.toString().includes(searchQuery.toLowerCase()) || (row.product_id.toString() === '1' && 'nier automata 2b'.includes(searchQuery.toLowerCase())) || (row.product_id.toString() === '2' && 'chainsaw man denji'.includes(searchQuery.toLowerCase())) || (row.product_id.toString() === '3' && 'hatsune miku love sailor'.includes(searchQuery.toLowerCase())) || (row.product_id.toString() === '4' && 'rimuru tempest banpresto'.includes(searchQuery.toLowerCase())) || (row.product_id.toString() === '5' && 'nier automata a2'.includes(searchQuery.toLowerCase())) || (row.product_id.toString() === '6' && 'rent-a-girlfriend ruka sarashina exhibition v'.includes(searchQuery.toLowerCase())) || (row.product_id.toString() === '7' && 'horimiya manga set [en japones]'.includes(searchQuery.toLowerCase()));
        return idMatch || productMatch;
      });
    }
  
    return rows;
  };

    return(
        
        <div>
            <div className='text-center'>
                <h3>Orders history</h3>
            </div>

            <div className="container id='tabla_roles'">
                <table className="table table-striped table-hover table-responsive">

                <thead>
            <tr>
              <th></th>

              {/* buscador */}
              <th colSpan="2"> 
              <form onSubmit={(event) => event.preventDefault()} >
                <input id='ordenamiento' className="form-control me-2" type="search"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  placeholder="Search"
                 />
                </form>

              </th>
              <th>

                {/* ordenadores */}
              <select value={sortOrder} onChange={handleSortChange} id="SortUser" className="form-select" >
              <option value="">Sort by:</option>
                <option value="ascName">A-Z</option> 
                <option value="descName">Z-A</option>
                <option value="descDate">Oldest</option>
                <option value="ascDate">Newest</option>
              </select>
              </th>
              <th></th>
              <th></th>
              {/* el boton de agregar */}
              <th><button type="button" className="btn btn-dark add_rol">ADD</button></th>
            </tr>
          </thead>






                    <thead>
                        <tr>
                            <th className='text-center'>Order id</th>
                            <th className='text-center'>Product id</th>
                            <th className='text-center'>Imagen</th>
                            <th className='text-center'>Quantity</th>
                            <th className='text-center'>Price</th>
                            <th className='text-center'>Creation Date</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(props.orders.rows)?
                        sortedRows().map(user => (                        
                            <tr key={user.id}>

                                <td className='text-center'>{user.order_id}</td>
                                <td className='text-center'>
                                    {user.product_id.toString() === '1' ? 'Figura Funko - Nier :Automata 2B' : 
                                     user.product_id.toString() === '2' ? 'Nendoroid Chainsaw Man Denji' : 
                                     user.product_id.toString() === '3' ? 'Hatsune Miku Love Sailor' : 
                                     user.product_id.toString() === '4' ? 'Figura Rimuru Tempest - banpresto' : 
                                     user.product_id.toString() === '5' ? 'Figura Nendoroid - Nier :Automata A2' : 
                                     user.product_id.toString() === '6' ? 'Rent-A-Girlfriend Ruka Sarashina Exhibition V' : 
                                     user.product_id.toString() === '7' ? 'Horimiya Manga Set [en Japones]' : 
                                     ''}
                                </td>
                                <td className='text-center'>{user.image}</td>
                                <td className='text-center'>{user.quantity}</td>
                                <td className='text-center'>{user.price}</td>
                                <td className='text-center'>{user.creation_date}</td>
                                <th ><button type="button" className="btn btn-dark bordered">Edit</button> <button type="button" className="btn btn-danger bordered">Delete</button> </th>
                            </tr>


                            )) : null
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

// Orders.propTypes = {
//     Orders: PropTypes.shape({
//     rows: PropTypes.arrayOf(
//         PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         order_id: PropTypes.string.isRequired,
//         product_id: PropTypes.string.isRequired,
//         image: PropTypes.string.isRequired,
//         email: PropTypes.string.isRequired,
//         quantity: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         creation_date: PropTypes.number.isRequired,
//         })
//     ).isRequired,
//     }).isRequired,
// };

export default Orders
