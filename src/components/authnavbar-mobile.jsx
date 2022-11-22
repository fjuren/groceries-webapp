import { ThemeProvider } from '@emotion/react';
import '../assets/styles/authnavbar.css';
import Button from '@mui/material/Button';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config';

const AuthnavbarMobile = ({ authStatus }) => {
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

  const handleFavorites = () => {
    navigation('/favorites');
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        authStatus(false);
        navigation('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <header id="mobile-header">
        <div id="navbar">
          <a href="" className="logo">
            Logo
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
                <Button variant="txt" sx={{ width: '6rem' }} onClick={() => handleFavorites()}>
                  Favorites
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

export default AuthnavbarMobile;