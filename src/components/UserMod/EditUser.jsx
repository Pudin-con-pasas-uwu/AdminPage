import Link from "next/link";

const EditUser = () => {

    return (
<div>
    <div className='container'>
    <form className="row g-3">

    <div className="col-6">
    <label>Name</label>
    <input type="text" 
    className="form-control" />
   </div>

  <div className="col-6">
  <label>Last name</label>
  <input type="text"
  className="form-control" />
  </div> 

  <div className="col-12">
  <label>Address</label>
  <input type="text"
  className="form-control" />
  </div>

  <div className="col-6">
  <label>Username</label>
  <input type="text"
  className="form-control" required/>
  </div>

  <div className="col-6">
  <label>Roles</label>
  <select
  className="form-select">
  <option> Choose a role </option>
 </select>
 </div>

  <div className="col-md-6">
  <label>Email</label>
  <input type="text"
  className="form-control" required/>
  </div>

  <div className="col-md-6">
  <label>Password</label>
  <input type="password" 
  className="form-control" required/>
  </div>

  <div className="col-md-6">
  <label>Phone</label>
  <input type="text"
  className="form-control" />
  </div>
    
  <div className="col-md-6">
  <label>birthdate</label>
  <input type="date" 
  className="form-control"></input>
  </div>

  <div className="col-lg-12">
  <button className="btn btn-dark w-100 mb-2 bordered" type="submit">Edit</button>
  <Link href="/Users" className="btn btn-danger w-100 mb-1 bordered">Go back</Link>
  </div>

</form> 
</div>
</div>
    );
}

export default EditUser;