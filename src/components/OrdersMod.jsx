import React, {useState} from 'react';
import orderSearch from '@/components/orderSearch'
const OrdersMod = (props) => {

    const [orders, setorders] = useState(props.orders.rows);

        const filterOrders = (query, orders) => orders.filter(user => {
            const orderSearch = ['produc_id'/*pruduct*/];
            const queryLower = query.toLowerCase();
            return orderSearch.some(field => user [field].toLowerCase().includes(queryLower));
        });

        function handleSearch(query) {
            const res = filterOrders(query, props.orders.rows);
            setorders(res);
        }

    return(
        
        <div>
            <div>
                <h1>Historial de pedidos</h1>
            </div>
            <div>
                <orderSearch orders={props.orders.rows} onSearch={handleSearch} />
            </div>

            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Order id</th>
                        <th>Product id</th>
                        <th>Imagen</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Creation Date</th>

                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(orders)?
                    orders.map(user => (                        
                        <tr key={user.id}>
                            
                            <td>{user.order_id}</td>
                            <td>{user.product_id}</td>
                            <td>{user.image}</td>
                            <td>{user.quantity}</td>
                            <td>{user.price}</td>
                            <td>{user.creation_date}</td>
                        </tr>


                        )) : null
                    }
                </tbody>

            </table>
        </div>
    )
}
export default OrdersMod