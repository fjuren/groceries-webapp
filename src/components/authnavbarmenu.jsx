import { ThemeProvider } from '@emotion/react';
import '../assets/styles/navbar.css';
import '../assets/styles/menudrawer.css';
import Button from '@mui/material/Button';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config';

const Authnavbarmenu = ({ expandHamburger, setExpandHamburger, authStatus }) => {
  const navigation = useNavigate();

  const handleHome = () => {
    console.log();
    navigation('/');
    setExpandHamburger(!expandHamburger);
  };

  const handleGrocerfy = () => {
    console.log();
    navigation('/grocerfylist');
    setExpandHamburger(!expandHamburger);
  };

  const handleRecipes = () => {
    console.log();
    navigation('/recipes');
    setExpandHamburger(!expandHamburger);
  };

  const handleFavorites = () => {
    console.log();
    navigation('/favorites');
    setExpandHamburger(!expandHamburger);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        authStatus(false);
        navigation('/');
        setExpandHamburger(!expandHamburger);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="menu-drawer" id={expandHamburger ? 'active' : null}>
        <nav className="menu">
          <ul>
            <li>
              <Button
                variant="txt"
                sx={{ width: '329px', height: '50px' }}
                onClick={() => handleHome()}>
                Home
              </Button>
            </li>
            <li>
              <Button
                variant="txt"
                sx={{ width: '329px', height: '50px' }}
                onClick={() => handleGrocerfy()}>
                MyGrocerfy List
              </Button>
            </li>
            <li>
              <Button
                variant="txt"
                sx={{ width: '329px', height: '50px' }}
                onClick={() => handleRecipes()}>
                Recipes
              </Button>
            </li>
            <li>
              <Button
                variant="txt"
                sx={{ width: '329px', height: '50px' }}
                onClick={() => handleFavorites()}>
                Favorites
              </Button>
            </li>
            <li>
              <Button
                className="login-btn"
                variant="outlined"
                sx={{ width: '329px', height: '50px', marginLeft: 'auto', marginRight: '1rem' }}
                onClick={() => handleLogout()}>
                Log out
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </ThemeProvider>
  );
};

export default Authnavbarmenu;
