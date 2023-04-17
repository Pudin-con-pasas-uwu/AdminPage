import { useState } from "react";
import Link from "next/link";


const Roles = (props) => {
  //variables de estado
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
      case "ascName": //el case es necesario para poder usar este argumento en el select
        rows.sort((a, b) => a.name.localeCompare(b.name)); //this one, ordena de A-Z
        break;
      case "descName":
        rows.sort((a, b) => b.name.localeCompare(a.name)); // no creo que sea necesario decir que hace esta verdad??
        break;
      case "ascDate":
        rows.sort(
          (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
        ); //esto es para acomodar por fecha de creacion
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
      //esto vendria siendo la funcion de busqueda, en la cual, solo mostrara los objetos que se escriban dentro de esta
      rows = rows.filter((row) => {
        const nameMatch = row.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        //esos 3 const, son para que la barra de busqueda tome en cuenta, elementos que hay en la tabla
        //en este caso, solo buscara lo que son el nombre, username y correo, si buscas por otro elemento como por ejemplo
        return nameMatch;
      });
    }

    return rows;
  };

  const deleterole = async(id) => {
    try {
      const options = {
        method: 'DELETE'
      }
      await fetch(`https://ecommerunid.sistemasdelcaribe.com/delete_role/${id}`, options)
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
      <Link href="Add_role" type="button" className="btn btn-dark" id="buttonadd">Agregar</Link>
    </div>
  </div>
</div>

      <div className="container" id="tabla_roles">
        <table className="table table-striped table-hover table-responsive" id="roles">
          <thead>
            <tr className="text-center">
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(props.Roles.rows) && props.Roles.rows.length > 0
              ? sortedRows().map((rol) => (
                  <tr key={rol.id}>
                    <td className="text-center">{rol.name}</td>
                    <td className="">
                    <Link href={`/roleactions/${rol.id}`} key={rol.id}>
                      <button type="button" className="btn btn-dark ActionSpace">
                        Editar
                      </button>  
                      </Link>
                      <button type="button" className="btn btn-danger ActionSpace" onClick={() => deleterole(rol.id)}  >
                        Eliminar
                      </button>{" "}
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

export default Roles;
