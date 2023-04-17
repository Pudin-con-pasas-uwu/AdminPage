
import React from 'react';
import styles from '../../styles/butomSelectProducts.module.css';
import CategorySelect from './CategorySelect';
import { useRouter } from "next/router";
import { useState } from "react";

const ProductsTableEdit = () => {

    const router = useRouter();

    const [form, setForm] = useState({
        product_name: "",
        image: "",
      creation_date: new Date().toISOString().substring(0, 10),
    });
  
    const [isLoading, setIsLoading] = useState(false);
  
    const handleChange = (e) => {
      const { value, name } = e.target;
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (isLoading) {
        return;
      }
  
      setIsLoading(true);
  
      try {
        const token = localStorage.getItem('adminToken');
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        };
        const res = await fetch(
          "https://ecommerunid.sistemasdelcaribe.com/insert_product",
          options
        );
        const data = await res.json();
        console.log(data);
        // Aquí puedes agregar código para mostrar una notificación de éxito o redirigir al usuario a otra página.
      } catch (error) {
        console.log(error);
        // Aquí puedes agregar código para mostrar una notificación de error al usuario.
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
        <div className='container formcontainer'>
            <form action="" onSubmit={handleSubmit}>
                <div className='container'>
                    <div className='row tuxteno'>
                        <div className='col-md-6'>
                            <label className='form-label'>nombre del producto</label>
                            <input type="text" className='form-control' name='product_name' value={form.product_name} onChange={handleChange} required/>
                        </div>
                        <div class="col-md-6">
                            <label for="formFile" class="form-label">selecciona la imagen</label>
                            <input class="form-control" type="file" name='image' id="formFile" value={form.image} onChange={handleChange} required/>
                        </div> 
                    </div>
                </div>
                <br />
                <div className='container'>
                    <div className='row tuxteno'>
                    <CategorySelect/>
                        {/* <div className='col-md-4'>
                            <label for="formFile" class="form-label" value={form.category_id} onChange={handleChange} required >Select category</label>
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="inputGroupSelect01" >category</label>
                                    <select class="form-select" id="inputGroupSelect01">
                                        <option selected>Choose...</option>
                                        <option value="1">Furyuu</option>
                                        <option value="2">Nendoroid</option>
                                        <option value="3">Good Smile Company</option>
                                        <option value="4">POP UP PARADE</option>
                                        <option value="5">Taito</option>
                                        <option value="6">Banpresto</option>
                                        <option value="7">Mangas</option>
                                        <option value="8">Funko</option>
                                    </select>
                            </div>
                        </div> */}
                        <div className='col-md-4'>
                                <label for="formFile" class="form-label">inserte stock</label>
                            <div class="input-group mb-3">
                                <span class="input-group-text">Unid</span>
                                    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" value={form.stock} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className='col-md-4'>
                        <label for="formFile" class="form-label">inserte precio</label>
                            <div class="input-group mb-3">
                                <span class="input-group-text">$</span>
                                    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"  value={form.price} onChange={handleChange} required />
                            </div>   
                        </div>
                    </div>
                </div>
                <br />
                <div className='container'>
                    <div className='row tuxteno'>
                        <div className='col-md-6'>
                            <label for="formFile" class="form-label">inserte descripción corta</label>
                            <div class="input-group">
                                <span class="input-group-text">area de texto</span>
                                <textarea class="form-control" aria-label="With textarea" value={form.short_desc} onChange={handleChange} required ></textarea>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label for="formFile" class="form-label">inserte descripción del producto</label>
                            <div class="input-group">
                                <span class="input-group-text">area de texto</span>
                                <textarea class="form-control" aria-label="With textarea" value={form.description} onChange={handleChange} required></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div class="container">
                    <div className='row'>
                        <div className='col-md-6'>
                            <a class="btn btn-dark" id={styles.bottomSpace} tipe="button" href="javascript:history.back()">Atras</a>
                        </div>
                            <div className='col-md-6'>
                                <button type="submit" className="btn btn-danger" id={styles.bottomSpace} >{isLoading ? "Adding..." : "Añadir productos"}</button>
                            </div>
                    </div>
                </div> 
            </form>
        </div>
    );
}

export default ProductsTableEdit;