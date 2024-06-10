import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CarList from './components/CarList.jsx'
import CarDetail from './components/CarDetail.jsx'
import DetailList from './components/DetailList.jsx';

import {BrowserRouter, Route, Routes} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App/>}/>
        <Route path='/cars' element={<CarList/>}/>
        <Route path='/cars/:id' element={<CarDetail/>}/>
        <Route path="/details" element={<DetailList />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)