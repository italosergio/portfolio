import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import './styles/app.css';
import {Home, NotFoundPage} from './pages';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/home" /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
