import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import './style.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cars" exact component={CarList} />
          <Route path="/cars/:id" component={CarDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
