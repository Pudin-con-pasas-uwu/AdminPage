import React from "react";
import { useRouter } from "next/router";
import styles from '@/styles/formord.module.css';
import { useState } from 'react';
import OrderAdd from "@/pages/OrdersModule/orderadd/OrderAdd";


const FormOrders = (props) =>{

    const [precio, setMessage] = useState('');
    const [updated, setUpdated] = useState(precio);

    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    const fechaActual = (`${year}-${month}-${day}`);
  
    
    const elselect =  () => {
     
    }

    const router = useRouter()
    const orderData={
        creation_date: fechaActual,
    }
   function handleChange(event){
      
        setMessage(event.target.value);
        
   }
   function setQuantity(event){
    var numero= event.target.value
     var total = precio * numero;       
    setUpdated(total);

}
   
    return(
        <div className="Formulario" id={styles.Formulario}>
        <div className="tit1" id={styles.tit1}>
                <h1>Agregar orden</h1>
                <p className="sub" id={styles.sub}>Rellene el formulario para añadir un nuevo pedido</p>
            </div>
            <div className="container">
            <form className="row g-3 Form1" id={styles.Form1}>
                <div className="col-md-5">
                    <label htmlFor="" className="la" id={styles.la}>Productos</label>
                    <select type="text" placeholder="Product name" className="form-control" id={styles.in} onChange={handleChange}>
                    {Array.isArray(props.users.rows) && props.users.rows.length > 0 ?
                        props.users.rows.map(user => (  
                    <option key={user.price} value={user.price}>{user.product_name}</option>
        
                    )) : null
                    }
                    </select>
                </div>
                <div className="col-md-3">
                    <label htmlFor="" className="la" id={styles.la} >Cantidad</label>
                    <input type="text" placeholder="Quantity" className="form-control" id={styles.in} onChange={setQuantity}/>
                </div>
                <div className="col-md-3">
                    <label htmlFor="" className="la" id={styles.la}>Precio total</label>
                    <h5>${updated}</h5>
                    <input type="hidden" placeholder="$" className="form-control"  id={styles.in} value={updated}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="" className="la" id={styles.la}>Usuario</label>
                    <input type="text" placeholder="User" className="form-control" id={styles.in}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="" className="la" id={styles.la} >Estado</label>
                    <select type="text" placeholder="Status" className="form-control" id={styles.in} onChange={ elselect }>
                    
                        <option selected>Active select 1/Inactive select 0</option>
                        <option value="uno">0</option>
                        <option value="uno">1</option>
        </select>
        </div>        
            </form>
            <div className="col-lg-12">
                <button className="btn btn-dark add_rol w-100 mb-1 bordered" id={styles.btn2} type="submit">Agregar</button>
                <button className="btn btn-danger add_rol w-100 mb-2 bordered " id={styles.btn2} onClick={() => router.back()}>Regresar</button>
            </div>
        </div>
        </div>
    )

    
};
export default FormOrders;