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
import ViewRecipe from './pages/subpages/ViewRecipe';
import Favourites from './pages/favourites';
import Signup from './pages/signup';
import Login from './pages/login';

import './assets/styles/App.css';

function App() {
  const [isAuthorized, setIsAuthorized] = useState(localStorage.getItem('authStatus'));
  // localStorage.getItem()

  // const userLogout = (e) => {

  // }

  const homeParentPath = '/';
  const homeParentName = 'Home';
  const myRecipeParentPath = '/recipes';
  const myRecipeParentName = 'Recipes';
  const myFavouritesParentPath = '/favourites';
  const myFavouritesName = 'Favourites';

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
        <Route path="/" element={<Home authStatus={isAuthorized} />} />
        <Route
          path="/view-recipe"
          element={<ViewRecipe parentPage={homeParentPath} parentPageName={homeParentName} />}
        />
        <Route path="/grocerfylist" element={<Grocerfylist authStatus={isAuthorized} />} />
        <Route exact path="/recipes" element={<Recipes authStatus={isAuthorized} />} />
        <Route path="/recipes/create-a-new-recipe" element={<Createnewrecipe />} />
        <Route
          path="/recipes/view-recipe"
          element={
            <ViewRecipe parentPage={myRecipeParentPath} parentPageName={myRecipeParentName} />
          }
        />
        <Route path="/favourites" element={<Favourites authStatus={isAuthorized} />} />
        <Route
          path="/favourites/view-recipe"
          element={
            <ViewRecipe parentPage={myFavouritesParentPath} parentPageName={myFavouritesName} />
          }
        />
        <Route path="/signup" element={<Signup setAuthStatus={setIsAuthorized} />} />
        <Route path="/login" element={<Login setAuthStatus={setIsAuthorized} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
