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
      <input type="text" value={query} onChange={handleInputChange} placeholder="Search..." className='form-control UserSearchIN' />
    </div>
  );
};

export default BuscadorUser;
