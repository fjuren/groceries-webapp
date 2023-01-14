import { ThemeProvider } from '@emotion/react';
import '../assets/styles/authnavbar.css';
import Button from '@mui/material/Button';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import logo from '../../src/assets/images/logo.png';

const Authnavbar = ({ authStatus }) => {
  const navigation = useNavigate();

  const handleHome = () => {
    navigation('/');
  };

  const handleGrocerfy = () => {
    navigation('/grocerfylist');
  };

  const handleRecipes = () => {
    navigation('/recipes');
  };

  const handlefavourites = () => {
    navigation('/favourites');
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        authStatus(false);
        navigation('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <header id="desktop-header">
        <div id="navbar">
          <a href="/" className="logo">
            <img src={logo} className="logo-img" />
          </a>
          <nav className="menu">
            <ul>
              <li>
                <Button variant="txt" sx={{ width: '6rem' }} onClick={() => handleHome()}>
                  Home
                </Button>
              </li>
              <li>
                <Button variant="txt" sx={{ width: '9rem' }} onClick={() => handleGrocerfy()}>
                  MyGrocerfy List
                </Button>
              </li>
              <li>
                <Button variant="txt" sx={{ width: '6rem' }} onClick={() => handleRecipes()}>
                  Recipes
                </Button>
              </li>
              <li>
                <Button variant="txt" sx={{ width: '6rem' }} onClick={() => handlefavourites()}>
                  Favourites
                </Button>
              </li>
            </ul>
          </nav>
          <Button
            className="login-btn"
            variant="outlined"
            sx={{ width: '6rem', marginLeft: 'auto', marginRight: '1rem' }}
            onClick={() => handleLogout()}>
            Log out
          </Button>
        </div>
      </header>
    </ThemeProvider>
  );
};

export default Authnavbar;
