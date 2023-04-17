import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
    
const FormUser = () => {
  const router = useRouter();

const [name, setName] = useState('');
const [last_name, setLastName] = useState('');
const [username, setUsername] = useState('');
const [address, setAddress] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [phone_number, setPhoneNumber] = useState('');
const [birth_date, setBirthdate] = useState('');

  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  const fechaActual = (`${year}-${month}-${day}`);

const handlesubmit=(e)=>{
  e.preventDefault();
  // const token = localStorage.getItem("adminToken"); //tokecito
  const userData={
    name, 
    last_name, 
    username,
    address, 
    email, 
    password, 
    phone_number, 
    birth_date, 
    creation_date: fechaActual,
    role_id: selectedRole
  };
          
  fetch("https://ecommerunid.sistemasdelcaribe.com/insert_user", {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
    // },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      router.push("/Users");
    })
    .catch((err) => {
      console.log(err.message);
    });
}
    
return (
  <div>
  <div className='container'>
  <form className="row g-3" onSubmit={handlesubmit}>

  <div className="col-6">
  <label>Nombre</label>
  <input type="text"
  value={name} onChange={e=>setName(e.target.value)} 
  className="form-control" />
  </div>

  <div className="col-6">
  <label>Apellidos</label>
  <input type="text"
  value={last_name} onChange={e=>setLastName(e.target.value)} 
  className="form-control" />
  </div> 

  <div className="col-md-6">
  <label>Dirección</label>
  <input type="text"
  value={address} onChange={e=>setAddress(e.target.value)} 
  className="form-control" />
  </div>

  <div className="col-md-6">
  <label>Número de teléfono</label>
  <input type="text"
  value={phone_number} onChange={e=>setPhoneNumber(e.target.value)} 
  className="form-control" />
  </div>

  <div className="col-md-6">
  <label>Usuario</label>
  <input type="text"
  value={username} onChange={e=>setUsername(e.target.value)} maxLength={10} 
  className="form-control" required/>
  </div>

  <div className="col-md-6">
  <label>Contraseña</label>
  <input type="password" 
  value={password} onChange={e=>setPassword(e.target.value)} maxLength={10}
  className="form-control" required/>
  </div>

  <div className="col-md-6">
  <label>Correo electrónico</label>
  <input type="text"
  value={email} onChange={e=>setEmail(e.target.value)} 
  className="form-control" required/>
  </div>
    
  <div className="col-md-6">
  <label>Fecha de nacimiento</label>
  <input type="date" 
  value={birth_date} onChange={e=>setBirthdate(e.target.value)} 
  className="form-control"></input>
  </div>

  <div className="col-lg-12">
  <button className="btn btn-dark w-100 mb-2 bordered" type="submit">Agregar</button>
  <Link href="/Users" className="btn btn-danger w-100 mb-1 bordered">Regresar</Link>
  </div>

</form> 
</div>
</div>
);
};

export default FormUser;