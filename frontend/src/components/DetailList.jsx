import React, { useState, useEffect } from 'react';

function DetailsList() {
const [search, setSearch] = useState('');
const [details, setDetails] = useState([]);

useEffect(() => {
    fetch('http://localhost:5000/api/details')
    .then(response => response.json())
    .then(data => setDetails(data))
    .catch(error => console.error('Error fetching details:', error));
}, []);

const handleSearchChange = (e) => setSearch(e.target.value);

const filteredDetails = details.filter(detail => detail.name.toLowerCase().includes(search.toLowerCase()));

return (
    <div className="details-list-page" style={{ color: 'black', backgroundColor: 'white', padding: '20px' }}>
    <header style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Список деталей</h1>
    </header>
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
        type="text"
        placeholder="Пошук"
        value={search}
        onChange={handleSearchChange}
        style={{ padding: '10px', width: '300px' }}
        />
    </div>
    <div>
        {filteredDetails.length ? (
        filteredDetails.map((detail, index) => (
            <div key={index} style={{ marginBottom: '20px', border: '1px solid black', padding: '10px' }}>
            <h3>{detail.name}</h3>
            <p>{detail.description}</p>
            </div>
        ))
        ) : (
        <p>Немає доступних деталей</p>
        )}
    </div>
    </div>
);
}

export default DetailsList;
