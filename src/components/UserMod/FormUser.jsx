import { useState, useEffect } from "react";
import Link from "next/link";
    
const FormUser = () => {

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
  };
          
  fetch("https://ecommerce-unid.000webhostapp.com/users",{
  method:"POST",
  body:JSON.stringify(userData)
  }).then((res)=>{
  

  }).catch((err)=>{
   console.log(err.message)
  })  
  }
    
return (
    <div>
    <div className='container'>
    <form className="row g-3" onSubmit={handlesubmit}>

    <div className="col-6">
    <label>Name</label>
    <input type="text"
    value={name} onChange={e=>setName(e.target.value)} 
    className="form-control" />
   </div>

  <div className="col-6">
  <label>Last name</label>
  <input type="text"
  value={last_name} onChange={e=>setLastName(e.target.value)} 
  className="form-control" />
  </div>

  <div className="col-12">
  <label>Address</label>
  <input type="text"
  value={address} onChange={e=>setAddress(e.target.value)} 
  className="form-control" />
  </div>

  <div className="col-12">
  <label>Username</label>
  <input type="text"
  value={username} onChange={e=>setUsername(e.target.value)} maxLength={10} 
  className="form-control" required/>
  </div>

  <div className="col-md-6">
  <label>Email</label>
  <input type="text"
  value={email} onChange={e=>setEmail(e.target.value)} 
  className="form-control" required/>
  </div>

  <div className="col-md-6">
  <label>Password</label>
  <input type="password" 
  value={password} onChange={e=>setPassword(e.target.value)} maxLength={10}
  className="form-control" required/>
  </div>

  <div className="col-md-6">
  <label>Phone</label>
  <input type="text"
  value={phone_number} onChange={e=>setPhoneNumber(e.target.value)} 
  className="form-control" />
  </div>
    

  <div className="col-md-6">
  <label>birthdate</label>
  <input type="date" 
  value={birth_date} onChange={e=>setBirthdate(e.target.value)} 
  className="form-control"></input>
  </div>

  <div className="col-lg-12">
  <button className="btn btn-dark w-100 mb-2 bordered" type="submit">Add</button>
  <Link href="/Users" className="btn btn-danger w-100 mb-1 bordered">Go back</Link>
  </div>

</form> 
</div>
</div>
);
};

export default FormUser;