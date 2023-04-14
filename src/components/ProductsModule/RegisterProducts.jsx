import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import styles from '../../styles/butomSelectProducts.module.css';
import CategorySelect from "./CategorySelect";

var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();
const fechaActual = (`${year}-${month}-${day}`);

const RegisterProducts = () => {

//   aqui es donde se manda a llamar el token
  // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODExNzIyNTcsImRhdGEiOiIxIn0.TUuXhlOxdAF1wxFdMZfjD3Uk6coXo46jv3FkrakTwgo";
  
  const router = useRouter();

  const [form, setForm] = useState({
      category_id: '',
      product_name: '',
      price: '',
      stock: '',
      short_desc: '',
      description: '',
      image: "example.jpg",
      creation_date: fechaActual

  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const {value, name} = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     postData(form);
//   }
//   const postData = async (form) => {
//     try{
//         console.log(form);
//         const options = {
//           method: 'POST',
//           body: JSON.stringify(form)
//         };
//           const res = await fetch('https://ecommerce-unid.000webhostapp.com/products', options); ojo error cors ojo  ....  ver libreria axios
//           const data = await res.json();
//           console.log(data);
//         router.push('')
//     } catch(error){
//         console.log(error);
//     }

//   }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const options = {
        method: "POST",
        //aqui van los headers con el token de autorizacion 
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${token}`
        // },
        body: JSON.stringify(form),
      };
      const res = await fetch("https://ecommerce-unid.000webhostapp.com/products", options);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  
    return (
      <>
      <div className='container formcontainer'>
      <form action="" onSubmit={handleSubmit}>
          <div className='container'>
              <div className='row tuxteno'>
                  <div className='col-md-6'>
                      <label className='form-label'>Product name</label>
                      <input type="text" className='form-control' name='product_name' value={form.product_name} onChange={handleChange}  required />
                  </div>
                  <div class="col-md-6">
                      <label for="formFile" class="form-label">Select your image</label>
                      <input class="form-control" type="file" name='image' id="formFile"/>
                  </div> 
              </div>
          </div>
          <br />
          <div className='container'>
              <div className='row tuxteno'>
                  <CategorySelect />
                  <div className='col-md-4'>
                          <label for="formFile" class="form-label">insert amount</label>
                      <div class="input-group mb-3">
                          <span class="input-group-text">Unid</span>
                          <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" name="stock" value={form.stock} onChange={handleChange}   required/>
                      </div>
                  </div>
                  <div className='col-md-4'>
                  <label for="formFile" class="form-label">insert price</label>
                      <div class="input-group mb-3">
                          <span class="input-group-text">$</span>
                          <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" name="price" value={form.price} onChange={handleChange}  required/>
                      </div>   
                  </div>
              </div>
          </div>
          <br />
          <div className='container'>
              <div className='row tuxteno'>
                  <div className='col-md-6'>
                      <label for="formFile" class="form-label">insert a small description</label>
                      <div class="input-group">
                          <span class="input-group-text">With text area</span>
                          <textarea class="form-control" aria-label="With textarea" name="short_desc"  value={form.short_desc} onChange={handleChange}  required ></textarea>
                      </div>
                  </div>
                  <div className='col-md-6'>
                      <label for="formFile" class="form-label">insert product description</label>
                      <div class="input-group">
                          <span class="input-group-text">With text area</span>
                          <textarea class="form-control" aria-label="With textarea" name="description" value={form.description} onChange={handleChange}   required ></textarea>
                      </div>
                  </div>
              </div>
          </div>
          <br />
          <div class="container">
              <div className='row'>
                  <div className='col-md-6'>
                      <a class="btn btn-dark" id={styles.bottomSpace} tipe="button" href="javascript:history.back()">Go back</a>
                  </div>  
                  <div className='col-md-6'>
                    <button className="btn btn-dark"  id={styles.bottomSpace} type="submit">Add products</button>
                  </div>
              </div>
          </div> 
      </form>
  </div>
            </>
          );
    }
  export default RegisterProducts