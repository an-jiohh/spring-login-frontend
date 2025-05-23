import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoggedInHome from './components/LoggedInHome';
import Login from './components/Login';
import Signup from './components/Signup';
import Memo from './components/Memo';
import NotFound from './components/NotFound';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/memo" element={isLoggedIn ? <Memo /> : <Navigate to="/login" replace />} />
        <Route 
          path="/" 
          element={isLoggedIn ? <LoggedInHome /> : <Home />} 
        />
        <Route 
          path="/home" 
          element={isLoggedIn ? <LoggedInHome /> : <Home />} 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;