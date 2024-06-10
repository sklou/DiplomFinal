import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');  // Потрібно для модального вікна

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [engineType, setEngineType] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  const [workingEngine, setWorkingEngine] = useState(false);
  const [workingTransmission, setWorkingTransmission] = useState(false);
  const [workingBody, setWorkingBody] = useState(false);
  const [workingSuspension, setWorkingSuspension] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newCarName, setNewCarName] = useState('');
  const [newEngineType, setNewEngineType] = useState('');
  const [newTransmissionType, setNewTransmissionType] = useState('');
  const [newBodyCondition, setNewBodyCondition] = useState('Цілий');
  const [newSuspensionCondition, setNewSuspensionCondition] = useState('Працює');
  const [newParts, setNewParts] = useState({
    engine: '',
    transmission: '',
    body: '',
    suspension: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleEngineTypeChange = (e) => {
    setEngineType(e.target.value);
  };

  const handleTransmissionTypeChange = (e) => {
    setTransmissionType(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateCar = () => {
    const carData = {
      name: newCarName,
      engine: newEngineType,
      transmission: newTransmissionType,
      body: newBodyCondition,
      suspension: newSuspensionCondition,
      parts: newParts
    };

    fetch('http://localhost:5000/api/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    })
      .then(response => response.json())
      .then(data => {
        setCars([...cars, data]);
        setModalIsOpen(false);
      })
      .catch(error => console.error('Error creating car:', error));
  };

  const filteredCars = cars.filter(car => {
    const carName = car.name || ''; // Додано перевірку на наявність імені
    const matchesSearchTerm = carName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEngineType = engineType === '' || (
      engineType === 'ДВЗ' && car.engine.includes('ДВЗ') ||
      engineType === 'ЕД' && car.engine.includes('ЕД') ||
      engineType === 'ГД' && car.engine.includes('ГД')
    );
    const matchesTransmissionType = transmissionType === '' || (
      transmissionType === 'АКПП' && car.transmission.includes('АКПП') ||
      transmissionType === 'МКПП' && car.transmission.includes('МКПП')
    );
    const matchesWorkingEngine = !workingEngine || (car.parts && car.parts.some(part => part.name.toLowerCase().includes('engine') && part.functional === 1));
    const matchesWorkingTransmission = !workingTransmission || (car.parts && car.parts.some(part => part.name.toLowerCase().includes('transmission') && part.functional === 1));
    const matchesWorkingBody = !workingBody || (car.parts && car.parts.some(part => part.name.toLowerCase().includes('body') && part.functional === 1));
    const matchesWorkingSuspension = !workingSuspension || (car.parts && car.parts.some(part => part.name.toLowerCase().includes('suspension') && part.functional === 1));

    return matchesSearchTerm && matchesEngineType && matchesTransmissionType && matchesWorkingEngine && matchesWorkingTransmission && matchesWorkingBody && matchesWorkingSuspension;
  });

  return (
    <div className="car-list-page" style={{ color: 'black', backgroundColor: 'white', padding: '20px' }}>
      <header style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Car List</h1>
      </header>
      <button onClick={toggleFilters} style={{ marginBottom: '20px' }}>
        {filtersVisible ? 'Hide Filters' : 'Show Filters'}
      </button>
      {filtersVisible && (
        <div className="filters" style={{ marginBottom: '20px' }}>
          <div>
            <label>Engine Type:</label>
            <select value={engineType} onChange={handleEngineTypeChange}>
              <option value="">All</option>
              <option value="ДВЗ">Internal Combustion Engine (ДВЗ)</option>
              <option value="ЕД">Electric Engine (ЕД)</option>
              <option value="ГД">Hybrid Engine (ГД)</option>
            </select>
          </div>
          <div>
            <label>Transmission Type:</label>
            <select value={transmissionType} onChange={handleTransmissionTypeChange}>
              <option value="">All</option>
              <option value="АКПП">Automatic Transmission (АКПП)</option>
              <option value="МКПП">Manual Transmission (МКПП)</option>
            </select>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={workingEngine}
                onChange={() => setWorkingEngine(!workingEngine)}
              />
              Working Engine
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={workingTransmission}
                onChange={() => setWorkingTransmission(!workingTransmission)}
              />
              Working Transmission
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={workingBody}
                onChange={() => setWorkingBody(!workingBody)}
              />
              Working Body
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={workingSuspension}
                onChange={() => setWorkingSuspension(!workingSuspension)}
              />
              Working Suspension
            </label>
          </div>
        </div>
      )}
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchTermChange}
          style={{ marginBottom: '20px', padding: '5px' }}
        />
      </div>
      <div className="car-list">
        {filteredCars.map(car => (
          <div key={car.id} className="car-card" style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
            <h3>{car.name}</h3>
            <p>Engine: {car.engine}</p>
            <p>Transmission: {car.transmission}</p>
            <Link to={`/cars/${car.id}`}>Детальніше</Link>
          </div>
        ))}
      </div>
      <button onClick={() => setModalIsOpen(true)} style={{ marginTop: '20px' }}>
        Створити оголошення
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Create Car"
        style={{
          content: {
            color: 'black',
            backgroundColor: 'white',
            padding: '20px',
            width: '300px',
            margin: 'auto'
          }
        }}
      >
        <h2>Створити оголошення</h2>
        <form onSubmit={e => { e.preventDefault(); handleCreateCar(); }}>
          <div>
            <label>Назва машини:</label>
            <input
              type="text"
              value={newCarName}
              onChange={e => setNewCarName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Тип двигуна:</label>
            <select
              value={newEngineType}
              onChange={e => setNewEngineType(e.target.value)}
              required
            >
              <option value="">Виберіть тип</option>
              <option value="ДВЗ">ДВЗ</option>
              <option value="ЕД">ЕД</option>
              <option value="ГД">ГД</option>
            </select>
          </div>
          <div>
            <label>Тип трансмісії:</label>
            <select
              value={newTransmissionType}
              onChange={e => setNewTransmissionType(e.target.value)}
              required
            >
              <option value="">Виберіть тип</option>
              <option value="АКПП">АКПП</option>
              <option value="МКПП">МКПП</option>
            </select>
          </div>
          <div>
            <label>Стан кузову:</label>
            <select
              value={newBodyCondition}
              onChange={e => setNewBodyCondition(e.target.value)}
              required
            >
              <option value="Цілий">Цілий</option>
              <option value="Пошкоджений">Пошкоджений</option>
            </select>
          </div>
          <div>
            <label>Стан ходової:</label>
            <select
              value={newSuspensionCondition}
              onChange={e => setNewSuspensionCondition(e.target.value)}
              required
            >
              <option value="Працює">Працює</option>
              <option value="Пошкоджена">Пошкоджена</option>
            </select>
          </div>
          <div>
            <label>Стан частин:</label>
            <div>
              <label>Двигун:</label>
              <select
                value={newParts.engine}
                onChange={e => setNewParts({ ...newParts, engine: e.target.value })}
                required
              >
                <option value="">Виберіть стан</option>
                <option value="ДВЗ працює">ДВЗ працює</option>
                <option value="ДВЗ не працює">ДВЗ не працює</option>
                <option value="ЕД працює">ЕД працює</option>
                <option value="ЕД не працює">ЕД не працює</option>
                <option value="ГД працює">ГД працює</option>
                <option value="ГД не працює">ГД не працює</option>
              </select>
            </div>
            <div>
              <label>Трансмісія:</label>
              <select
                value={newParts.transmission}
                onChange={e => setNewParts({ ...newParts, transmission: e.target.value })}
                required
              >
                <option value="">Виберіть стан</option>
                <option value="АКПП працює">АКПП працює</option>
                <option value="АКПП не працює">АКПП не працює</option>
                <option value="МКПП працює">МКПП працює</option>
                <option value="МКПП не працює">МКПП не працює</option>
              </select>
            </div>
          </div>
          <button type="submit">Створити</button>
        </form>
      </Modal>
    </div>
  );
};

export default CarList;
