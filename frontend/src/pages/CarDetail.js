import React from 'react';
import { useParams } from 'react-router-dom';

function CarDetail() {
  const { id } = useParams();
  // Dummy data for car detail
  const car = {
    id,
    name: 'Назва машини',
    description: 'Детальний опис машини',
    imageUrl: 'url-to-car-image.jpg'
  };

  return (
    <div className="car-detail-page" style={{ color: 'black', backgroundColor: 'white', padding: '20px' }}>
      <header style={{ textAlign: 'center', padding: '20px' }}>
        <h1>{car.name}</h1>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={car.imageUrl} alt={car.name} style={{ width: '80%', height: 'auto', marginBottom: '20px' }} />
        <p style={{ maxWidth: '600px', textAlign: 'center' }}>{car.description}</p>
      </div>
    </div>
  );
}

export default CarDetail;
