import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { auth } from './firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/navbar';
import Authnavbar from './components/authnavbar';
import Home from './pages/Home';
import Grocerfylist from './pages/grocerfylist';
import Recipes from './pages/recipes';
import Favorites from './pages/favorites';
import Signup from './pages/signup';
import Login from './pages/login';

import './assets/styles/App.css';

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  // const userLogout = (e) => {

  // }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && isAuthorized === true) {
        console.log('authorized');
      } else {
        console.log('not autorized');
      }
    });
  }, [isAuthorized]);

  return (
    <BrowserRouter>
      {!isAuthorized ? <Navbar /> : <Authnavbar authStatus={setIsAuthorized} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grocerfylist" element={<Grocerfylist />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/signup" element={<Signup authStatus={setIsAuthorized} />} />
        <Route path="/login" element={<Login authStatus={setIsAuthorized} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
