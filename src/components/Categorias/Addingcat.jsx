import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
const AddingCat = () => {
  const router = useRouter();

  //el useState es la variable de estado que se puede actualizar, suele estar vacio, ya que el usuario lo rellena con los inputs
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [creation_date, ] = useState(new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }));

  //aqui se conecta a la api
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(
        'https://ecommerunid.sistemasdelcaribe.com/insert_categorie',
        { name, image, creation_date },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <main>
       <div className="container">
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center"
        >
          <div className="form-container alabel text-center">
            <label>Nombre de la categoría:</label>
            <input
              placeholder="nueva categoría"
              type="text"
              name="name"
              className="form-control"
              value={name}
              onChange={event=>setName(event.target.value)}
              required
            />
          </div>
          <div className="form-container alabel text-center">
            <label>imagen:</label>
            <input
              placeholder="Nueva imagen"
              type="text"
              name="image"
              className="form-control"
              value={image}
              onChange={event=>setImage(event.target.value)}
              required
            />
          </div>
          <div className="container boton_añadir">
            <button type="submit" className="btn btn-danger" id="bottomSpace">Add</button>
            <button type="button" className="btn btn-dark" id="bottomSpace" onClick={() => router.back()}>Go back</button>
          </div>
        </form>
      </div>

    </main>
  );
};

export default AddingCat;