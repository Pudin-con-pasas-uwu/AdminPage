import { useRouter } from "next/router";
import { useState } from "react";

var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();
const fechaActual = (`${year}-${month}-${day}`);

const Roladding = () => {
  
  // //aqui es donde se manda a llamar el token
  // const token = localStorage.getItem('adminToken');

  const router = useRouter()

  const [form, setForm] = useState({
      name: '',
      creation_date: fechaActual,
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

  const postData = async (form) => {
    try{
        console.log(form);
        const options = {
          method: 'POST',
          //aqui van los headers con el token de autorizacion
          // headers: {
          //   'Content-Type': 'application/json',
          //   'Authorization': `Bearer ${token}`
          // },
          body: JSON.stringify(form)
        };
        const res = await fetch('https://ecommerunid.sistemasdelcaribe.com/insert_role', options);
        const data = await res.json();
        console.log(data);
    } catch(error){
        console.log(error);
    }
  }

  return (
    <main>
      <div className="container">
        <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
          <div className="form-container alabel">
          <label>Nombre del rol:</label>
          <input placeholder="Nuevo rol" type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
          </div>
          <div className="container boton_añadir">
            <button type="submit" className="btn btn-danger" id="bottomSpace">Agregar</button>
            <button type="button" className="btn btn-dark" id="bottomSpace" onClick={() => router.back()}>Regresar</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Roladding;