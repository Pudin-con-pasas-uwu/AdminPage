import React from 'react';


const order_update = (props) => {
    console.log(props.order_id)
    var orderDetailFilter = props.order_detail.rows.filter(function (order) {
        return order.order_id === props.order_id;
    })
    return (

        <div>
            {
                orderDetailFilter.map(order_detail => (

                    
                    <div key={order_detail.order_id}>
                                    <div>
                                        <h3 id="orderDetail_tittle">Order Edit #{order_detail.order_id}</h3>
                                    </div>
                    </div>
                ))
            }
        </div>
    )
}

export default order_update