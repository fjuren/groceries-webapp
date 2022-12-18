import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { auth } from './firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/navbar';
import NavbarMobile from './components/navbar-mobile';
import Authnavbar from './components/authnavbar';
import AuthnavbarMobile from './components/authnavbar-mobile';
import Home from './pages/Home';
import Grocerfylist from './pages/grocerfylist';
import Recipes from './pages/recipes';
import Createnewrecipe from './pages/subpages/createNewRecipe';
import ViewMyRecipe from './pages/subpages/ViewMyRecipe';
import Favorites from './pages/favorites';
import Signup from './pages/signup';
import Login from './pages/login';

import './assets/styles/App.css';

function App() {
  const [isAuthorized, setIsAuthorized] = useState(localStorage.getItem('authStatus'));
  // localStorage.getItem()

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
      {!isAuthorized ? (
        <div>
          <Navbar />
          <NavbarMobile />
        </div>
      ) : (
        <div>
          <Authnavbar authStatus={setIsAuthorized} />
          <AuthnavbarMobile authStatus={setIsAuthorized} />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grocerfylist" element={<Grocerfylist authStatus={isAuthorized} />} />
        <Route exact path="/recipes" element={<Recipes />} />
        <Route path="/recipes/create-a-new-recipe" element={<Createnewrecipe />} />
        {/* <Route path="/recipes/:recipe-named-path" element={<ViewMyRecipe />} /> */}
        <Route path="/recipes/viewrecipe" element={<ViewMyRecipe />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/signup" element={<Signup authStatus={setIsAuthorized} />} />
        <Route path="/login" element={<Login authStatus={setIsAuthorized} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
