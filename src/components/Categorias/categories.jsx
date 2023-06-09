import { useState } from "react";
import Link from "next/link";

//--------------------------------------------------
//librerias que no se usaran por el momento
// import PropTypes from 'prop-types';
//--------------------------------------------------

const Categories = (props) => {
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const sortedRows = () => {
    let rows = [...props.Categories.rows];

    switch (sortOrder) {
      case "ascName":
        rows.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "descName":
        rows.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "ascDate":
        rows.sort(
          (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
        );
        break;
      case "descDate":
        rows.sort(
          (a, b) => new Date(a.creation_date) - new Date(b.creation_date)
        );
        break;
      default:
        break;
    }

    if (searchQuery) {
      rows = rows.filter((row) => {
        const nameMatch = row.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return nameMatch;
      });
    }

    return rows;
  };
  
  const deletecategorie = async(id) => {
    try {
      const options = {
        method: 'DELETE'
      }
      await fetch(`https://ecommerunid.sistemasdelcaribe.com/delete_categorie/${id}`, options)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main>
      <div className='container'>
  <div className="row">
    <div className="col-sm-12 col-md-4 my-2">
      <form onSubmit={(event) => event.preventDefault()} >
        <input id='ordenamiento' className="form-control me-2" type="search" placeholder="Búsqueda..." aria-label="Search"
            value={searchQuery}
            onChange={handleSearchQueryChange}
        />
      </form>          
    </div>
    <div className="col-sm-12 col-md-4 my-2">
      <select value={sortOrder} onChange={handleSortChange} id='ordenamiento'  className="form-select form-select " >
        <option value="">Ordenar por:</option>
        <option value="ascName">A-Z</option> 
        <option value="descName">Z-A</option>
        <option value="descDate">Antiguo</option>
        <option value="ascDate">Reciente</option>
      </select>
    </div>
    <div className="col-sm-12 col-md-4 my-2">
      <Link href="/Categorie_add" type="button" className="btn btn-dark" id="buttonadd">Agregar</Link>
    </div>
  </div>
</div>
      <div className="container" id="tabla_roles">
        <table className="table table-striped table-hover table-responsive" id="categorias">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(props.Categories.rows) &&
            props.Categories.rows.length > 0
              ? sortedRows().map((categorie) => (
                  <tr key={categorie.id}>
                    <td className="text-center">{categorie.id}</td>
                    <td className="text-center">{categorie.name}</td>
                    <td id="sizir">

                      <Link href={`/categoriesactions/${categorie.id}`} key={categorie.id}>
                      <button type="button" className="btn btn-dark ActionSpace">
                        Editar
                      </button>  
                      </Link>
                      <button type="button" className="btn btn-danger ActionSpace" onClick={() => deletecategorie(categorie.id)} >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </main>
  );
};

// Categories.propTypes = {
//   Categories: PropTypes.shape({
//     rows: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         name: PropTypes.string.isRequired,
//         creation_date: PropTypes.number.isRequired,
//       })
//     ).isRequired,
//   }).isRequired,
// };

export default Categories;
