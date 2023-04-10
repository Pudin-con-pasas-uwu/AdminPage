import React from 'react';
import { useRouter } from "next/router";


const order_detail = (props) => {
    var orderDetailFilter = props.order_detail.rows.filter(function (order) {
        return order.order_id === props.order_id;
    })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    return (

        <div>
            {
                orderDetailFilter.map(order_detail => (


                    <div key={order_detail.order_id}>
                        <div>
                            <h3 id="orderDetail_tittle">Order Detail #{order_detail.order_id}</h3>
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
                                                    <p id="orderDetail_quantity" >Quantity: </p><span> {order_detail.quantity} unit(s)</span><br />
                                                    <p id="orderDetail_price">Price: </p><span> ${order_detail.price}.MNX</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))  : suma
                                } 
                                <hr />
                            </div>
                            <div className='container'>
                                <div className="row">
                                    <h3 id="orderDetail_total">Total({order_detail.quantity} Products): ${order_detail.price}</h3>
                                </div>
                                <button className="btn btn-dark" id="orderDetail_backButton" onClick={() => router.back()}>Go back</button>
                            </div>
                    </div>
                ))
            }
        </div>
    )
}

export default order_detail