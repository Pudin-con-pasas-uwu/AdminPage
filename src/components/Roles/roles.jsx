import { useState } from 'react';
import PropTypes from 'prop-types';

const Roles = (props) => {
  //variables de estado
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery]  = useState('');

  //eventos, this permite a la funcion select poder mandar mostrar los argumentos que se le pide ordenar como debe
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  }; 

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const sortedRows = () => {
    let rows = [...props.Roles.rows];
  
    //esta cosa es lo que establece las funciones de como se debe ordenar los elementos de la tabla segun la funcion seleccionada tomando en cuenta la const declarada
    //en este caso, el sortOrder para el filtro, y pss el switch es como un if, pero no es un if xd
    switch (sortOrder) {
      case 'ascName': //el case es necesario para poder usar este argumento en el select
        rows.sort((a, b) => a.name.localeCompare(b.name)); //this one, ordena de A-Z
        break;
      case 'descName':
        rows.sort((a, b) => b.name.localeCompare(a.name)); // no creo que sea necesario decir que hace esta verdad??
        break;
      case 'ascDate':
        rows.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date)); //esto es para acomodar por fecha de creacion
        break;
      case 'descDate':
        rows.sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));
        break;
      default:
        break;
    }
  
    if (searchQuery) { //esto vendria siendo la funcion de busqueda, en la cual, solo mostrara los objetos que se escriban dentro de esta
      rows = rows.filter((row) => {
        const nameMatch = row.name.toLowerCase().includes(searchQuery.toLowerCase());
        const usernameMatch = row.username.toLowerCase().includes(searchQuery.toLowerCase());
        const emailMatch = row.email.toLowerCase().includes(searchQuery.toLowerCase());
        //esos 3 const, son para que la barra de busqueda tome en cuenta, elementos que hay en la tabla
        //en este caso, solo buscara lo que son el nombre, username y correo, si buscas por otro elemento como por ejemplo
        //el numero de telefono, no te los mostrara por que no esta declarado, al menos en mi caso no me lo muestra unu
        return nameMatch || usernameMatch || emailMatch;
      });
    }
  
    return rows;
  };

  return (
    <main>
      <div className="container" id='tabla_roles'>
        <table className="table table-striped table-hover table-responsive" >
        <thead>
            <tr>
              <th></th>

              {/* buscador */}
              <th colspan="2"> 
              <form onSubmit={(event) => event.preventDefault()} >
                <input id='ordenamiento' class="form-control me-2" type="search"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                  placeholder="Search"
                 />
                </form>

              </th>
              <th>

                {/* ordenadores */}
              <select value={sortOrder} onChange={handleSortChange} id='ordenamiento' class="form-select">
                <option value="">Order by:</option>
                <option value="ascName">A-Z</option> {/* aqui va lo de case, dentro de value, para que sepa que funcion se hace y el handle sort  haga su trabajo*/}
                <option value="descName">Z-A</option>
                <option value="ascDate">Recent</option>
                <option value="descDate">Oldest</option>
              </select>
              </th>
              <th></th>
              <th></th>
              <th></th>
              {/* el boton de agregar */}
              <th><button type="button" class="btn btn-dark" id='boton_agregar'>ADD</button></th>
            </tr>
          </thead>

          <thead>
            <tr className='text-center'>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Rol</th>
              <th>Creation date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(props.Roles.rows) && props.Roles.rows.length > 0 ? (
              sortedRows().map((rol) => (
                <tr key={rol.id}>
                  <th className='text-center'>{rol.id}</th>
                  <th className='text-center'>{rol.name}</th>
                  <th className='text-center'>{rol.username}</th>
                  <th className='text-center'>{rol.email}</th>
                  <th className='text-center'>{rol.phone_number}</th>
                  <th className='text-center'>
                    {rol.role_id.toString() === '1' ? 'Admnin' : 
                     rol.role_id.toString() === '2' ? 'User' : 
                     rol.role_id.toString() === '3' ? 'Client' : ''}
                  </th>
                  <th className='text-center'>{rol.creation_date}</th>
                  <th><button type="button" class="btn btn-dark bordered">Edit</button> <button type="button" class="btn btn-danger bordered">Erase</button> </th>
                </tr>
              ))
            ) : null}
          </tbody>
        </table>
      </div>
    </main>
  );
};

Roles.propTypes = {
  Roles: PropTypes.shape({
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone_number: PropTypes.string.isRequired,
        role_id: PropTypes.number.isRequired,
        creation_date: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Roles;
