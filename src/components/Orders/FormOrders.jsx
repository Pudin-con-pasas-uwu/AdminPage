import React from "react";
import { useRouter } from "next/router";
import styles from '@/styles/formord.module.css';
import { useState } from 'react';
import OrderAdd from "@/pages/OrdersModule/orderadd/OrderAdd";


const FormOrders = (props) =>{

    const [precio, setMessage] = useState('');
    const [updated, setUpdated] = useState(precio);
    
    const elselect =  () => {
     
    }

    const router = useRouter()
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
                <p>Add Order</p>
            </div>
            <div>
                <p className="sub" id={styles.sub}>Fill out the form to add a new order</p>
            </div>
            <form action="" className="Form1" id={styles.Form1}>
                
                <div>
                    <label htmlFor="" className="la" id={styles.la}>User</label>
                    <input type="text" placeholder="User" className="in" id={styles.in}/>
                </div>
                <div>
                    <label htmlFor="" className="la" id={styles.la}>Product</label>
                    <select type="text" placeholder="Product name" className="in" id={styles.in} onChange={handleChange}>
                    {Array.isArray(props.users.rows) && props.users.rows.length > 0 ?
                        props.users.rows.map(user => (  
                    <option key={user.price} value={user.price}>{user.product_name}</option>
        
                    )) : null
                    }
                    </select>
                </div>
                <div>
                    <label htmlFor="" className="la" id={styles.la} >Quantity</label>
                    <input type="text" placeholder="Quantity" className="in" id={styles.in} onChange={setQuantity}/>
                </div>
                <div>
                    <label htmlFor="" className="la" id={styles.la}>Price</label>
                    <input type="text" placeholder="$" className="in"  id={styles.in} value={precio}/>
                </div>
                <div>
                    <label htmlFor="" className="la" id={styles.la}>Total amount</label>
                    <input type="text" placeholder="$" className="in"  id={styles.in} value={updated}/>
                </div>
                <div>
                    <label className="la" id={styles.la}>Creation Date</label>
                    <input type="date" className="in" id={styles.in} ></input>
                    
                 </div>
                <div>
                    <label htmlFor="" className="la" id={styles.la} >Order status</label>
                    <select type="text" placeholder="Status" className="in" id={styles.in} onChange={ elselect }>
                    
                        <option selected>Active select 1/Inactive select 0</option>
                        <option value="uno">0</option>
                        <option value="uno">1</option>
        </select>
                    
                </div>
                
            </form>
            <div>
                <button class="btn2 btn-dark add_rol" className="btn2" id={styles.btn2} onClick={() => router.back()}>Go back</button>
                <button class="btn2 btn-dark add_rol" className="btn2" id={styles.btn2} type="submit">Add</button>
            </div>
        </div>
    )

    
};
export default FormOrders;