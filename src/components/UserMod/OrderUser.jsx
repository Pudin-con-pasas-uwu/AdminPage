import React,{useState} from 'react';

const OrderUser = (props) => {
    const [sortOption, setSortOption] = useState('');


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
<select value={sortOption} onChange={(e) => handleSort(e.target.value)} className="form-select" id="SortUser">
<option value="">Ordenar por:</option>
<option value="nameAsc">Nombre asc</option>
<option value="nameDesc">Nombre desc</option>
<option value="dateAsc">Fecha asc</option>
<option value="dateDesc">Fecha desc</option>
</select>
  <div>
    </div>
        </div>
    );
}

export default OrderUser;
