import React from 'react';
import { useRouter } from "next/router";
import { useState } from "react";


const order_update = (props) => {
    
    const router = useRouter()

    const [form, setForm] = useState({
        quantity: '',
    })
    const handleChange = (e) => {
        const {value, name} = e.target;
        setForm({
        ...form,
        [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        postData(form);
    }

    console.log(props.order_id)
    var orderDetailFilter = props.order_detail.rows.filter(function (order) {
        return order.order_id === props.order_id;
    })
    const deleteOrderDetail = async(id) => {
        try {
            const options = {
            method: 'DELETE'
            }
            await fetch(`https://ecommerunid.sistemasdelcaribe.com/delete_order_detail/${id}`, options)
        } catch (error) {
            console.log(error)
        }
        }
    return (

        <div>
            {
                orderDetailFilter.map(order_detail => (

                    
                    <div key={order_detail.order_id}>
                                    <div>
                                        <h3 id="orderDetail_tittle">Editar orden #{order_detail.order_id}</h3>
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
                                                <div className="col-lg-3">
                                                    <p id="orderDetail_quantity" >Cantidad: </p><input id="orderUpdate_quantityInput" className='form-control' type="number" placeholder={order_detail.quantity} onChange={handleChange}/><br />
                                                    <p id="orderDetail_price">Precio: </p><span> ${order_detail.price * order_detail.quantity}.MNX</span>
                                                </div>
                                                <div className="col-lg-1">
                                                    <svg onClick={() => deleteOrderDetail(order_detail.id)} id="orderUpdate_deleteIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ))  : null
                                } 
                                <hr />
                            </div>
                            <div className='container'>
                            <button className="btn btn-danger" id="orderDetail_backButton">Actualizar</button>
                                <button className="btn btn-dark" id="orderDetail_backButton" onClick={() => router.back()}>Regresar</button>
                            </div>
                    </div>
                ))
            }
        </div>
    )
}

export default order_update