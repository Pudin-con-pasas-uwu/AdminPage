import React, {useState} from 'react';
import Link from 'next/link'

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
        const user_idMatch = row.user_id.toString().includes(searchQuery.toLowerCase());
        return idMatch || user_idMatch;
      });
    }
  
    return rows;
  };
    return(
        
        <div>
            <div>
                <h3 id="ordersMod_tittle" >Orders</h3>
            </div>
            <div className="container">
          <div className='row'>
<div className="col-sm-12 col-md-4 my-2">
              {/* buscador */}
              <form onSubmit={(event) => event.preventDefault()}>
                <input className="form-control" type="search" value={searchQuery} onChange={handleSearchQueryChange} placeholder="Search"/>
              </form>
              </div>
              <div className="col-sm-12 col-md-4 my-2">
              {/* ordenadores */}
              <select value={sortOrder} onChange={handleSortChange} className="form-select">
                <option value="">Sort by:</option>
                <option value="ascName">A-Z</option>
                <option value="descName">Z-A</option>
                <option value="descDate">Oldest</option>
                <option value="ascDate">Newest</option>
              </select>
              </div>
              <div className="col-sm-12 col-md-4 my-2">
              {/* el boton de agregar */}
              <button type="button" className="btn btn-dark" id="ordersMod_addButton">ADD</button>
</div>
          </div>
              </div>
              <div className="container">
                <table className="table table-striped table-hover table-responsive" id="ordersMod_table">

                    <thead>
                        <tr>
                            <th className='text-center'>ID</th>
                            <th className='text-center'>User</th>
                            <th className='text-center'>Total Amount</th>
                            <th className='text-center'>Creation Date</th>
                            <th className='text-center'>Order status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(props.orders.rows)?
                        sortedRows().map(order => (              
                            <tr key={order.id}>
                                <td className='text-center'>{order.id}</td>
                                <td className='text-center'>{order.user_id}</td>
                                <td className='text-center'>${order.total_amount}.MNX</td>
                                <td className='text-center'>{order.creation_date}</td>
                                <td className='text-center'>{order.order_status}</td>
                                <th ><Link type="button" className="btn btn-dark bordered ordersMod_optionButton" href={`order_detail/${order.id}`}>Detail </Link> <Link type="button" className="btn btn-dark bordered ordersMod_optionButton" href={`order_update/${order.id}`}>Edit</Link> <button type="button" className="btn btn-danger bordered ordersMod_optionButton">Delete</button> </th>
                            </tr>
                            
                            )): null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Orders;