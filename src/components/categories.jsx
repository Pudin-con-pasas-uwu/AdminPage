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

  return (
    <main>
<div className='text-center filter_position'>
  <table className="table table-striped table-hover" id="PaddingTopTable">
    <thead>
    <tr>
                    <th colspan="6">
                        <form onSubmit={(event) => event.preventDefault()} >
                            <input id='ordenamiento' class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchQueryChange}
                            />
                        </form>
                    </th>          
                    <th colspan="1" id="testerw">
                        <select value={sortOrder} onChange={handleSortChange} id='ordenamiento'  class="form-select form-select " >
                        <option value="">Sort by:</option>
                    <option value="ascName">A-Z</option> 
                    <option value="descName">Z-A</option>
                    <option value="descDate">Oldest</option>
                    <option value="ascDate">Newest</option>
                        </select>
                    </th>
                    <th colspan="2">
                      <Link href="#" type="button" class="btn btn-dark" id="buttonadd">ADD</Link>
                    </th>
                </tr>
    </thead>
  </table>
</div>
      <div className="container" id="tabla_roles">
        <table className="table table-striped table-hover table-responsive">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Creation date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(props.Categories.rows) &&
            props.Categories.rows.length > 0
              ? sortedRows().map((categorie) => (
                  <tr key={categorie.id}>
                    <td className="text-center">{categorie.id}</td>
                    <td className="text-center">{categorie.name}</td>
                    <td className="text-center">{categorie.creation_date}</td>
                    <td id="sizir">
                      <button type="button" className="btn btn-dark bordered">
                        Edit
                      </button>{" "}
                      <button type="button" className="btn btn-danger bordered">
                        Delete
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
