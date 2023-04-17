import Link from "next/link";
import { useRouter } from "next/router";
import React,{useState, useEffect} from "react";
import axios from "axios";

const EditUser = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState(props.currentUser);

    useEffect(() => {
      if (id) {
        axios.get(`https://ecommerunid.sistemasdelcaribe.com/one_user/${id}`).then((res) => {
          setUser(res.data);
        });
      }
    }, [id]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post(`https://ecommerunid.sistemasdelcaribe.com/edit_user/${id}`, {
          name: user.name,
          last_name: user.last_name,
          username: user.username,
          address: user.address,
          password: user.password,
          phone_number: user.phone_number,
          birth_date: user.birth_date,
        });
    
        console.log(response.data);
    
        // te lleva al user mod
        router.push('/Users');
      } catch (error) {
        console.error(error);
      }
    };
      //
      const handleLastNameChange = (event) => {
        setUser({ ...user, last_name: event.target.value });
      };
    
      const handleUsernameChange = (event) => {
        setUser({ ...user, username: event.target.value });
      };
    
      const handleAddressChange = (event) => {
        setUser({ ...user, address: event.target.value });
      };
    
      const handlePasswordChange = (event) => {
        setUser({ ...user, password: event.target.value });
      };
    
      const handlePhoneNumberChange = (event) => {
        setUser({ ...user, phone_number: event.target.value });
      };
    
      const handleBirthdateChange = (event) => {
        setUser({ ...user, birth_date: event.target.value });
      };
    
      const handleEmailChange = (event) => {
        setUser({ ...user, email: event.target.value });
      };

    return (
<div>
    <div className='container'>
    <form className="row g-3" onSubmit={handleSubmit}>

    <div className="col-6">
    <label>Name</label>
    <input
    type="text"
    className="form-control"
    id="name"
    value={user ? user.name : ""}
    onChange={handleUsernameChange}    />
   </div>

  <div className="col-6">
  <label>Apellidos</label>
  <input type="text"
  className="form-control" 
  value={user ? user.last_name : ""}
   onChange={handleLastNameChange}
   />
  </div> 

  <div className="col-md-6">
  <label>Dirección</label>
  <input type="text"
  className="form-control" 
  value={user ? user.address : ""}
  onChange={handleAddressChange}
  />
  </div>

  <div className="col-md-6">
  <label>Número de telefóno</label>
  <input type="text"
  className="form-control" 
  value={user ? user.phone_number : ""}
  onChange={handlePhoneNumberChange}
  />
  </div>

  <div className="col-6">
  <label>Usuario</label>
  <input type="text"
  className="form-control" 
  value={user ? user.username : ""}
  onChange={handleUsernameChange}
  />
  </div>

  <div className="col-md-6">
  <label>Contraseña</label>
  <input type="text" 
  className="form-control" 
  value={user ? user.password : ""}
  onChange={handlePasswordChange}
  />
  </div>

  <div className="col-md-6">
  <label>Correo Electrónico</label>
  <input type="text"
  className="form-control" 
  value={user ? user.email : ""}
  onChange={handleEmailChange}
  />
  </div>
    
  <div className="col-md-6">
  <label>Fecha de nacimiento</label>
  <input type="date" 
  className="form-control"
  value={user ? user.birth_date : ""}
  onChange={handleBirthdateChange}
  />
  </div>

  <div className="col-lg-12">
  <button className="btn btn-dark w-100 mb-2 bordered" type="submit">Editar</button>
  <Link href="/Users" className="btn btn-danger w-100 mb-1 bordered">Regresar</Link>
  </div>

</form> 
</div>
</div>
    );
}
export default EditUser;