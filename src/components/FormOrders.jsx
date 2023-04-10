import React from "react";
import styles from '@/styles/formord.module.css';


const FormOrders = () =>{
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
                    <label htmlFor="" className="la" id={styles.la}>Order id</label>
                    <input type="number" placeholder="whole number" className="in" id={styles.in}/>
                </div>
                <div>
                    <label htmlFor="" className="la" id={styles.la}>Product</label>
                    <input type="text" placeholder="Product name" className="in" id={styles.in}/>
                </div>
                <div>
                        <label for="formFile" className="la" id={styles.la}>Select your image</label>
                        <input class="form-control" type="file" name='image' id="formFile"/>
                </div> 
                <div>
                    <label htmlFor="" className="la" id={styles.la} >Quantity</label>
                    <input type="text" placeholder="Quantity" className="in" id={styles.in} />
                </div>
                <div>
                    <label htmlFor="" className="la" id={styles.la}>Price</label>
                    <input type="text" placeholder="$" className="in"  id={styles.in}/>
                </div>
                <div>
                    <label className="la" id={styles.la}>Creation Date</label>
                    <input type="date" className="form-control in"></input>
                 </div>
            </form>
            <button class="btn2 btn-dark add_rol" className="btn2" id={styles.btn2}>Save</button>
        </div>
    )

    
};
export default FormOrders;