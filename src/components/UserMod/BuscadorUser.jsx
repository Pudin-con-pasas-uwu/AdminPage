import React, { useState } from 'react';

const BuscadorUser = ({ users, onSearch }) => {
  const [query, setQuery] = useState('');

  function handleInputChange(event) {
    const { value } = event.target;
    setQuery(value);
    onSearch(value);
  }
  

  return (
    <div className="container">
      <input type="search" value={query} onChange={handleInputChange} placeholder="Search..." className='form-control me-2 mb-1' id="UserSearchIN" />
    </div>
  );
};

export default BuscadorUser;
