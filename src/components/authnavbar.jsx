import { ThemeProvider } from '@emotion/react';
import '../assets/styles/authnavbar.css';
import Button from '@mui/material/Button';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';
import logo from '../../src/assets/images/logo.png';
import { useEffect } from 'react';

const Authnavbar = ({ setAuthStatus }) => {
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
        setAuthStatus(false);
        navigation('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const firstName = user.displayName.split(' ')[0];
        console.log(firstName);
        document.getElementById('user-firstName').style.color = 'inherit';
        document.getElementById('user-firstName').innerHTML = 'Hi, ' + firstName + '!';
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

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
          <span id="user-firstName"></span>
          <Button
            className="login-btn"
            variant="outlined"
            sx={{ width: '6rem', marginLeft: '1rem', marginRight: '1rem' }}
            onClick={() => handleLogout()}>
            Log out
          </Button>
        </div>
      </header>
    </ThemeProvider>
  );
};

export default Authnavbar;
