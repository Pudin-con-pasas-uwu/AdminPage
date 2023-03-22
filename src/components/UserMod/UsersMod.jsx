import React, { useState } from 'react';
import Link from 'next/link';
import BuscadorUser from './BuscadorUser';
import OrderUser from './OrderUser';

const UsersMod = (props) => {
const [UsersFiltro, setUsersFiltro] = useState(props.users.rows);
const [sortOption, setSortOption] = useState("");


const filterUsers = (query, users) => users.filter(user => {
    const Buscador = ['name', 'last_name', 'username', 'email', 'address','password','role_id', 'phone_number', 'birth_date','creation_date', 'status'];
    const queryLower = query.toLowerCase();
    return Buscador.some(field => user[field].toLowerCase().includes(queryLower));
});

function handleSearch(query) {
    const Resultados = filterUsers(query, props.users.rows);
    setUsersFiltro(Resultados); 
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
  
return (
    <div>
        <div className="d-flex align-items-center justify-content-between">
        <div className='OrderSearch'>
        <BuscadorUser users={props.users.rows} onSearch={handleSearch} />
        <select value={sortOption} onChange={(e) => handleSort(e.target.value)} className="form-select" id="SortUser">
        <option value="">Sort by:</option>
        <option value="nameAsc">A-Z</option>
        <option value="nameDesc">Z-A</option>
        <option value="dateAsc">Oldest</option>
        <option value="dateDesc">Newest</option>
        </select>
        </div>
        <Link href="#" className="AgregarBT btn btn-dark">Agregar</Link>
    </div>
    <div className="container" id="tabla_users">
        <table className="table table-light table-striped" >
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Last name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Password</th>
                <th>Role</th>
                <th>Number</th>
                <th>Birthdate</th>
                <th>Creation</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {Array.isArray(UsersFiltro) && UsersFiltro.length > 0 ?
                UsersFiltro.map(user => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.password}</td>
                    <td>
                    {user.role_id.toString() === '1' ? 'Admin' : 
                     user.role_id.toString() === '2' ? 'User' : 
                     user.role_id.toString() === '3' ? 'Client' : ''}
                    </td>
                    <td>{user.phone_number}</td>
                    <td>{user.birth_date}</td>
                    <td>{user.creation_date}</td>
                    <td>{user.status}</td>
                    <td id="sizer">
                    <Link href="#" className="BT_ED_EL btn btn-dark">Editar</Link>
                    <Link href="#" className="BT_ED_EL btn btn-danger">Eliminar</Link>
                    </td>
                </tr>
                )) : null
            }
            </tbody>
        </table>
        </div>
        </div>
    )
    };

    export default UsersMod;