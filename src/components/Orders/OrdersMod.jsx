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

  const deleteOrder = async(id) => {
    try {
      const options = {
        method: 'DELETE'
      }
      await fetch(`https://ecommerunid.sistemasdelcaribe.com/delete_order_detail/${id}`, options)
    } catch (error) {
      console.log(error)
    }
  }
  
    return(
        
        <div>
            <div>
                <h3 id="ordersMod_tittle" >Órdenes</h3>
            </div>
            <div className="container">
          <div className='row'>
<div className="col-sm-12 col-md-4 my-2">
              {/* buscador */}
              <form onSubmit={(event) => event.preventDefault()}>
                <input className="form-control" type="search" value={searchQuery} onChange={handleSearchQueryChange} placeholder="Búsqueda..."/>
              </form>
              </div>
              <div className="col-sm-12 col-md-4 my-2">
              {/* ordenadores */}
              <select value={sortOrder} onChange={handleSortChange} className="form-select">
                <option value="">Ordernar por:</option>
                <option value="ascName">A-Z</option>
                <option value="descName">Z-A</option>
                <option value="descDate">Antiguo</option>
                <option value="ascDate">Reciente</option>
              </select>
              </div>
              <div className="col-sm-12 col-md-4 my-2">
              {/* el boton de agregar */}
              <tn>
              <Link href="/OrdersModule/orderadd/OrderAdd" type="button"  className="btn btn-dark" id="ordersMod_addButton">Agregar</Link>
              </tn>
</div>
          </div>
              </div>
              <div className="container orderTableResponsive">
                <table className="table table-striped table-hover table-responsive" id="ordersMod_table">

                    <thead>
                        <tr>
                            <th className='text-center'>ID</th>
                            <th className='text-center'>Usuario</th>
                            <th className='text-center'>Precio total</th>
                            <th className='text-center'>Fecha de creación</th>
                            <th className='text-center'>Estado</th>
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
                                <th ><Link 
                                type="button" className="btn btn-dark bordered ordersMod_optionButton" href={`order_detail/${order.id}`}>Detalles
                                </Link> <Link 
                                type="button" className="btn btn-dark bordered ordersMod_optionButton" href={`order_update/${order.id}`}>Editar
                                </Link> <button type="button" className="btn btn-danger bordered ordersMod_optionButton" onClick={() => deleteOrder(order.id)}>Eliminar</button> </th>
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