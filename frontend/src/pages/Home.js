import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page" style={{ color: 'black', backgroundColor: 'white' }}>
      <header style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Авто Продаж</h1>
        <p>Ми пропонуємо найкращі автомобілі за доступними цінами</p>
      </header>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Логін" />
          <input type="password" placeholder="Пароль" />
          <button type="submit" style={{ backgroundColor: 'red', color: 'white' }}>Увійти</button>
        </form>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Логін" />
          <input type="password" placeholder="Пароль" />
          <input type="email" placeholder="Email" />
          <button type="submit" style={{ backgroundColor: 'red', color: 'white' }}>Реєстрація</button>
        </form>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/cars" style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', textDecoration: 'none' }}>
          До списку машин
        </Link>
      </div>
    </div>
  );
}

export default Home;
