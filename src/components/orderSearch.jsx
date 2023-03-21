import React, { useState } from 'react';

const orderSearch = ({ orders, onSearch }) => {
const [query, setQuery] = useState('');

function handleInputChange(event) {
    const { value } = event.target;
    setQuery(value);
    onSearch(value);
}

return (
    <div>
    <input type="text" value={query} onChange={handleInputChange} placeholder="Search..." className='form-control mb-2' />
    </div>
);
};

export default orderSearch;