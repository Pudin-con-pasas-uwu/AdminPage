import { useRouter } from "next/router";
import { useState } from "react";

var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();
const fechaActual = (`${year}-${month}-${day}`);

const Roladding = () => {

  const router = useRouter()

  const [form, setForm] = useState({
      name: '',
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
          body: JSON.stringify(form)
        };
        const res = await fetch('https://ecommerce-unid.000webhostapp.com/roles', options);
        const data = await res.json();
        console.log(data);
    } catch(error){
        console.log(error);
    }
  }

  return (
    <main>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-container alabel">
          <label>Rol Name:</label>
          <input placeholder="The new rol" type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
          </div>
          <div className="container boton_añadir">
            <button type="submit" className="btn btn-danger" id="bottomSpace">Add</button>
            <button type="button" className="btn btn-dark" id="bottomSpace" onClick={() => router.back()}>Go back</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Roladding;