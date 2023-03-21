import { useState } from 'react';
import PropTypes from 'prop-types';

const Categories = (props) => {
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery]  = useState('');

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const sortedRows = () => {
    let rows = [...props.Categories.rows];
  
    switch (sortOrder) {
      case 'ascName':
        rows.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'descName':
        rows.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'ascDate':
        rows.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
        break;
      case 'descDate':
        rows.sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));
        break;
      default:
        break;
    }
  
    if (searchQuery) {
      rows = rows.filter((row) => {
        const nameMatch = row.name.toLowerCase().includes(searchQuery.toLowerCase());
        return nameMatch;
      });
    }
  
    return rows;
  };

  return (
    <main>
      <div className="container" id='filternsearch'>
      <div class="row justify">
    <div class="col-lg-8">
    <select value={sortOrder} onChange={handleSortChange} id='ordenamiento'>
          <option value="">Ordenar por:</option>
          <option value="ascName">A-Z</option>
          <option value="descName">Z-A</option>
          <option value="ascDate">Nuevo a Viejo</option>
          <option value="descDate">Viejo a nuevo</option>
        </select>
    </div>
    <div class="col-lg-4">
    <form onSubmit={(event) => event.preventDefault()}>
          <input id='ordenamiento'
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="Buscar"
          />
      </form>
    </div>
  </div>
      </div>
      <div className="container">
      <button type="button" class="btn btn-primary">Agregar</button>
      </div>
      <div className="container" id='tabla_roles'>
        <table className="table table-light table-striped-columns" >
          <thead>
            <tr className='text-center'>
              <th>ID</th>
              <th>Nombre</th>
              <th >Fecha de creación</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(props.Categories.rows) && props.Categories.rows.length > 0 ? (
              sortedRows().map((categorie) => (
                <tr key={categorie.id}>
                  <th >{categorie.id}</th>
                  <th >{categorie.name}</th>
                  <th >{categorie.creation_date}</th>
                  <th id='sizer'><button type="button" class="btn btn-black">Editar</button> <button type="button" class="btn btn-danger">Eliminar</button></th>
                </tr>
              ))
            ) : null}
          </tbody>
        </table>
      </div>
    </main>
  );
};

Categories.propTypes = {
  Categories: PropTypes.shape({
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        creation_date: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Categories;

