import React, { useState } from 'react';
import Link from 'next/link';
import BuscadorUser from './BuscadorUser';


const UsersMod = (props) => {
const [UsersFiltro, setUsersFiltro] = useState(props.users.rows);
const [sortOption, setSortOption] = useState("");
const [noResults, setNoResults] = useState(false); 

const filterUsers = (query, users) => users.filter(user => {
    const Buscador = ['name', 'last_name', 'username', 'email', 'address','password','role_id', 'phone_number', 'birth_date','creation_date', 'status'];
    const queryLower = query.toLowerCase();
    return Buscador.some(field => user[field].toLowerCase().includes(queryLower));
});

function handleSearch(query) {
    const Resultados = filterUsers(query, props.users.rows);
    setUsersFiltro(Resultados); 
    setNoResults(Resultados.length === 0);
}
function handleSort(option) {
    setSortOption(option);
    let sortedUsers = [];
    switch (option) {
    case "nameAsc":
    sortedUsers = [...UsersFiltro].sort((a, b) => a.name.localeCompare(b.name));
    break;
    case "nameDesc":
    sortedUsers = [...UsersFiltro].sort((a, b) => b.name.localeCompare(a.name));
    break;
    case "dateAsc":
    sortedUsers = [...UsersFiltro].sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));
    break;
    case "dateDesc":
    sortedUsers = [...UsersFiltro].sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
    break;
    default:
    sortedUsers = [...UsersFiltro];
    break;
    }
    setUsersFiltro(sortedUsers);
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if(confirmDelete) {
        try {
          const options = {
            method: 'DELETE'
          }
          await fetch(`https://ecommerunid.sistemasdelcaribe.com/delete_user/${id}`, options)
        } catch (error) {
          console.log(error)
        }
      }
    }
      
  
return (
    <main>
        <div className='container'>
            <div className="row">
            <div className="col-sm-12 col-md-4 my-2">
        <BuscadorUser users={props.users.rows} onSearch={handleSearch} />
        </div>
        <div className="col-sm-12 col-md-4 my-2">
        <select value={sortOption} onChange={(e) => handleSort(e.target.value)} className="form-select mb-1" id="SortUser">
        <option value="">Sort by:</option>
        <option value="nameAsc">A-Z</option>
        <option value="nameDesc">Z-A</option>
        <option value="dateAsc">Oldest</option>
        <option value="dateDesc">Newest</option>
        </select>
        </div>
        <div className="col-sm-12 col-md-4 my-2">
       <Link href="/UsersModule/UsersADD" className="AgregarBT btn btn-dark mb-1">ADD</Link>
        </div>
        </div>
        </div>
    <div className="table-responsive-xxl">        
    <table className="table table-striped table-hover table-sm" id="PaddingTopTable" >
        <thead>
        <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Last name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Number</th>
                <th>Birthdate</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
        {noResults ? (
       <tr>
       <td colSpan={10} style={{ textAlign: "center" }}>
        No results found.
       </td>
       </tr>
       ) : (
    UsersFiltro.map((user) => (
        <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                    {user.role_id.toString() === '1' ? 'Admin' : 
                     user.role_id.toString() === '2' ? 'User' : 
                     user.role_id.toString() === '3' ? 'Client' : ''}
                    </td>
                    <td>{user.phone_number}</td>
                    <td>{user.birth_date}</td>
                    <td>{user.status.toString() === '0' ? 'Inactivo' : 
                     user.status.toString() === '1' ? 'Activo' :''}</td>
                    <td id="sizer">
                   <div className="btn-group">
                   <Link href="/UsersModule/UsersEdit" className="btn btn-dark BT_ED_EL">Edit</Link>
                   <button type="button" className="btn btn-danger BT_ED_EL" onClick={() => handleDelete(user.id)}>
                    Delete
                   </button>

                  </div>         
                    </td>
                </tr>
                )) 
            )}
            </tbody>
        </table>
        </div>
        </main>
    )
};

export default UsersMod;