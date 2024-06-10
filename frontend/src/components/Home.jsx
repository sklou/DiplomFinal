  import { Link } from 'react-router-dom';
  import { useState } from 'react';

  function Home() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password, email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful');
      } else {
        alert('Registration failed: ' + data.error);
      }
    };

    return (
      <div className="home-page" style={{ color: 'black', backgroundColor: 'white' }}>
        <header style={{ textAlign: 'center', padding: '20px' }}>
          <h1>RSPK</h1>
          <p>Подаруй своєму авто друге життя</p>
        </header>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="text" placeholder="Логін" onChange={(e) => setLogin(e.target.value)} />
            <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" style={{ backgroundColor: 'red', color: 'white' }}>Увійти</button>
          </form>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={handleRegister}>
            <input type="text" placeholder="Логін" onChange={(e) => setLogin(e.target.value)} />
            <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" style={{ backgroundColor: 'red', color: 'white' }}>Реєстрація</button>
          </form>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/cars">
            До списку машин
          </Link>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/details">
            До списку деталей
          </Link>
        </div>
      </div>
    );
  }

  export default Home;
