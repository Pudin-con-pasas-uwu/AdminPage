import React from 'react';
import { useRouter } from "next/router";


const order_detail = (props) => {
    var orderDetailFilter = props.order_detail.rows.filter(function (order) {
        return order.order_id === props.order_id;
    })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()

    const sumPrice = orderDetailFilter.reduce((previus, current) => {
        return previus + current.price * current.quantity;
    }, '$');
    const sumProducts = orderDetailFilter.reduce((previus, current) => {
        return previus + current.quantity;
    }, '');

    return (

        <div>
            {
                orderDetailFilter.map(order_detail => (


                    <div key={order_detail.order_id}>
                        <div>
                            <h3 id="orderDetail_tittle">Detalle de orden #{order_detail.order_id}</h3>
                        </div>
                            <div className='container'>
                                {Array.isArray(orderDetailFilter) ?
                                    orderDetailFilter.map(order_detail => (
                                        <div key={order_detail.id} id="orderDetail_productSection">
                                            <hr />
                                            <div className='row'>
                                                <div className='col-lg-6  offset-lg-2'>
                                                    <h3 id="orderDetail_productName">{order_detail.product_name}</h3>
                                                </div>
                                                <div className="col-lg-4" id>
                                                    <p id="orderDetail_quantity" >Cantidad: </p><span> {order_detail.quantity} unidad(es)</span><br />
                                                    <p id="orderDetail_price">Precio: </p><span> ${order_detail.price}.MNX</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))  : null
                                } 
                                <hr />
                            </div>
                            <div className='container'>
                                <div className="row">
                                    <h3 id="orderDetail_total">Total({sumProducts} Productos): {sumPrice}</h3>
                                </div>
                                <button className="btn btn-dark" id="orderDetail_backButton" onClick={() => router.back()}>Regresar</button>
                            </div>
                    </div>
                ))
            }
        </div>
    )
}

export default order_detail