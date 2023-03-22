import React, {useState} from 'react';
import PropTypes from 'prop-types';

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
        const product_idMatch = row.product_id.toLowerCase().includes(searchQuery.toLowerCase());
        return idMatch || product_idMatch;
    });
    }

    return rows;
};

    return(
        
        <div>
            <div>
                <h1>Historial de pedidos</h1>
            </div>

<div className='row'>
<div className='col-sm-2'>
            <form onSubmit={(event) => event.preventDefault()} >
                <input id='OrdersMod_SearchInput'
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    placeholder="Buscar..."
                />
            </form>
</div>
<div className='col-sm-2'>
            <select value={sortOrder} onChange={handleSortChange} id='OrdersMod_SelectInput'>
                <option value="">Ordenar por:</option>
                <option value="ascID">ID ascendente</option>
                <option value="descID">ID descendente</option>
                <option value="ascDate">Nuevo a Viejo</option>
                <option value="descDate">Viejo a nuevo</option>
            </select> 
</div>
<div className='col-sm-2 offset-sm-5'>
        <button className='btn btn-success' id="OrdersMod_ButtonInsert">Añadir</button>
</div>
</div>
            <table className="table table-light table-striped">
                <thead>
                    <tr>
                        <th>Order id</th>
                        <th>Product id</th>
                        <th>Imagen</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Creation Date</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(props.orders.rows)?
                    sortedRows().map(user => (                        
                        <tr key={user.id}>
                            
                            <td>{user.order_id}</td>
                            <td>{user.product_id}</td>
                            <td>{user.image}</td>
                            <td>{user.quantity}</td>
                            <td>{user.price}</td>
                            <td>{user.creation_date}</td>
                            <td><button type="button" class="btn btn-dark bordered">Editar</button> 
                            <button type="button" class="btn btn-danger bordered">Eliminar</button></td>
                        </tr>


                        )) : null
                    }
                </tbody>

            </table>
        </div>
    )
}

Orders.propTypes = {
    Orders: PropTypes.shape({
    rows: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.number.isRequired,
        order_id: PropTypes.string.isRequired,
        product_id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        creation_date: PropTypes.number.isRequired,
        })
    ).isRequired,
    }).isRequired,
};

export default Orders