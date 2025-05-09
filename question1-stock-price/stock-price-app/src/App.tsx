import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StockPage from './pages/StockPage';
import CorrelationPage from './pages/CorrelationPage';
import Navbar from './components/Navbar';
import { setAuthToken } from './services/api';

// Set auth token (replace with your actual token)
setAuthToken('your-auth-token-here');

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<StockPage />} />
        <Route path="/correlation" element={<CorrelationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;