const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '3t0tM1rPr0gn1l',
  database: 'diplomdb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});


// Endpoint to fetch cars
app.get('/api/cars', (req, res) => {
  const sql = 'SELECT id, name, engine, transmission FROM cars';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint to fetch car by id
app.get('/api/cars/:id', (req, res) => {
  const sql = 'SELECT * FROM cars WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Endpoint to fetch car donors
app.get('/api/cars/:id/donors', (req, res) => {
  const carId = req.params.id;
  const sql = `
    SELECT * FROM cars 
    WHERE id != ? 
      AND name = (SELECT name FROM cars WHERE id = ?)
      AND id IN (
        SELECT car_id FROM car_parts 
        WHERE functional = 1 
          AND part_id IN (
            SELECT part_id FROM car_parts 
            WHERE car_id = ? 
              AND functional = 0
          )
      )
  `;
  db.query(sql, [carId, carId, carId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint to fetch car parts
app.get('/api/cars/:id/parts', (req, res) => {
  const carId = req.params.id;
  const sql = `
    SELECT * FROM parts 
    WHERE id IN (
      SELECT part_id FROM car_parts 
      WHERE car_id = ? AND functional = 0
    ) OR id NOT IN (
      SELECT part_id FROM car_parts
    )
  `;
  db.query(sql, [carId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint to fetch parts
app.get('/api/details', (req, res) => {
  const sql = 'SELECT * FROM parts';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint for user registration
app.post('/api/register', (req, res) => {
  const { login, password, email } = req.body;
  const sql = 'INSERT INTO users (login, password, email) VALUES (?, ?, ?)';
  db.query(sql, [login, password, email], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to register user' });
    } else {
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
});

// Endpoint to create a new car and its parts
app.post('/api/cars', (req, res) => {
  const { name, engine, transmission, body, suspension, parts } = req.body;

  console.log('Received data:', { name, engine, transmission, body, suspension, parts });

  const sqlInsertCar = 'INSERT INTO cars (name, engine, transmission, body, suspension) VALUES (?, ?, ?, ?, ?)';
  db.query(sqlInsertCar, [name, engine, transmission, body, suspension], (err, result) => {
    if (err) {
      console.error('Error inserting car:', err);
      res.status(500).json({ error: 'Failed to create car' });
      return;
    }

    const carId = result.insertId;
    const sqlInsertParts = `
      INSERT INTO car_parts (car_id, part_id, functional) VALUES 
      (?, (SELECT id FROM parts WHERE name = ?), ?), 
      (?, (SELECT id FROM parts WHERE name = ?), ?),
      (?, (SELECT id FROM parts WHERE name = ?), ?),
      (?, (SELECT id FROM parts WHERE name = ?), ?),
      (?, (SELECT id FROM parts WHERE name = ?), ?)
    `;

    db.query(sqlInsertParts, [
      carId, `${name} ДВЗ`, parts.engine.includes('працює') ? 1 : 0,
      carId, `${name} АКПП`, parts.transmission.includes('працює') && parts.transmission.includes('АКПП') ? 1 : 0,
      carId, `${name} МКПП`, parts.transmission.includes('працює') && parts.transmission.includes('МКПП') ? 1 : 0,
      carId, `${name} кузов`, body === 'Цілий' ? 1 : 0,
      carId, `${name} Ходова`, suspension === 'Працює' ? 1 : 0
    ], (err, result) => {
      if (err) {
        console.error('Error inserting car parts:', err);
        res.status(500).json({ error: 'Failed to create car parts' });
        return;
      }

      res.status(201).json({ id: carId, name, engine, transmission, body, suspension });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});