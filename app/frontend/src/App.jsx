import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import './styles/app.css';
import {Home, NotFoundPage, Projects} from './pages';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/home" /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/projects" element={ <Projects /> } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
