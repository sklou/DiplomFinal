import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './CarDetail.css';

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [donors, setDonors] = useState([]);
  const [parts, setParts] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/cars/${id}`)
        .then(response => response.json())
        .then(data => setCar(data))
        .catch(error => console.error('Error fetching car:', error));

      fetch(`http://localhost:5000/api/cars/${id}/donors`)
        .then(response => response.json())
        .then(data => setDonors(data))
        .catch(error => console.error('Error fetching donors:', error));

      fetch(`http://localhost:5000/api/cars/${id}/parts`)
        .then(response => response.json())
        .then(data => setParts(data))
        .catch(error => console.error('Error fetching parts:', error));
    }
  }, [id]);

  return (
    <div className="car-detail">
      {car ? (
        <div>
          <h2>{car.name}</h2>
          <p>{car.description}</p>
          <p>Engine: {car.engine}</p>
          <p>Transmission: {car.transmission}</p>
          <h3>Donors:</h3>
          {donors.length > 0 ? (
            <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} showThumbs={false}>
              {donors.map(donor => (
                <div key={donor.id} className="donor-card">
                  <h4>{donor.name}</h4>
                  <p>{donor.description}</p>
                </div>
              ))}
            </Carousel>
          ) : (
            <p>No donors available</p>
          )}
          <h3>Parts:</h3>
          {parts.length > 0 ? (
            <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} showThumbs={false}>
              {parts.map(part => (
                <div key={part.id} className="part-card">
                  <h4>{part.name}</h4>
                  <p>{part.description}</p>
                </div>
              ))}
            </Carousel>
          ) : (
            <p>No parts available</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CarDetail;