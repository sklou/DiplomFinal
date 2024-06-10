import React, { useState } from 'react';

function CarList() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    engine: false,
    transmission: false,
    suspension: false,
    body: false,
  });

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters({ ...filters, [name]: checked });
  };

  // Dummy data for car list
  const cars = [
    // Add some dummy car data here
  ];

  // Filter and search logic here
  const filteredCars = cars.filter(car => {
    // Apply filters and search term to car list
    return car.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="car-list-page" style={{ color: 'black', backgroundColor: 'white', padding: '20px' }}>
      <header style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Список машин</h1>
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
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <label>
          <input type="checkbox" name="engine" checked={filters.engine} onChange={handleFilterChange} />
          З працюючим двигуном
        </label>
        <label>
          <input type="checkbox" name="transmission" checked={filters.transmission} onChange={handleFilterChange} />
          З працюючою коробкою передач
        </label>
        <label>
          <input type="checkbox" name="suspension" checked={filters.suspension} onChange={handleFilterChange} />
          З працюючою підвіскою
        </label>
        <label>
          <input type="checkbox" name="body" checked={filters.body} onChange={handleFilterChange} />
          З цілим кузовом
        </label>
      </div>
      <div>
        {filteredCars.length ? (
          filteredCars.map((car, index) => (
            <div key={index} style={{ marginBottom: '20px', border: '1px solid black', padding: '10px' }}>
              <h3>{car.name}</h3>
              <p>{car.description}</p>
              <Link to={`/cars/${car.id}`} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', textDecoration: 'none' }}>Детальніше</Link>
            </div>
          ))
        ) : (
          <p>Немає доступних машин</p>
        )}
      </div>
    </div>
  );
}

export default CarList;
