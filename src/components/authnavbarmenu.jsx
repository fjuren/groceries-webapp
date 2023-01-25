import { React, useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import '../assets/styles/navbar.css';
import '../assets/styles/menudrawer.css';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';

const Authnavbarmenu = ({ expandHamburger, setExpandHamburger, setAuthStatus }) => {
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

  const handlefavourites = () => {
    console.log();
    navigation('/favourites');
    setExpandHamburger(!expandHamburger);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setAuthStatus(false);
        navigation('/');
        setExpandHamburger(!expandHamburger);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const firstName = user.displayName.split(' ')[0];
  //       console.log(firstName);
  //       // document.getElementById('user-firstName').style.color = 'yellow';
  //       document.getElementById('user-firstName-mobile').textContent = 'Hi, ' + firstName + '!';
  //       // ...
  //     } else {
  //       // User is signed out
  //       // ...
  //     }
  //   });
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="menu-drawer" id={expandHamburger ? 'active' : null}>
        <Collapse orientation="vertical" in={expandHamburger}>
          <nav className="menu">
            <ul>
              {/* <span id="user-firstName-mobile"></span> */}
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
                  onClick={() => handlefavourites()}>
                  Favourites
                </Button>
              </li>
              <li id="btn-logout">
                <Button
                  className="login-btn"
                  variant="outlined"
                  // sx={{ width: '329px', height: '50px' }}
                  onClick={() => handleLogout()}>
                  Log out
                </Button>
              </li>
            </ul>
          </nav>
        </Collapse>
      </div>
    </ThemeProvider>
  );
};

export default Authnavbarmenu;
