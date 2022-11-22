import { ThemeProvider } from '@emotion/react';
import '../assets/styles/navbar.css';
import '../assets/styles/loggedoutmenu.css';
import Button from '@mui/material/Button';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';

const Loggedoutmenu = ({ expandHamburger }) => {
  const navigation = useNavigate();

  // if (expandHamburger) {
  //   const slideDrawer = document.getElementsByClassName('loggedout-menu-drawer');
  //   console.log(slideDrawer.style);
  // }

  const handleHome = () => {
    console.log();
    navigation('/');
  };

  const handleSignup = () => {
    console.log();
    navigation('/signup');
  };

  const handleLogin = () => {
    console.log();
    navigation('/login');
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="loggedout-menu-drawer" id={expandHamburger ? 'active' : null}>
        <nav>
          <ul>
            <li>
              <Button
                className="login-btn"
                variant="outlined"
                sx={{ width: '6rem', marginLeft: '1rem', marginRight: '1rem' }}
                onClick={() => handleLogin()}>
                Log in
              </Button>
            </li>
            <li>
              <Button
                className="signup-btn"
                variant="outlined"
                sx={{ width: '6rem', marginLeft: 'auto' }}
                onClick={() => handleSignup()}>
                Sign up
              </Button>
            </li>
            <li>
              <Button variant="txt" sx={{ width: '6rem' }} onClick={() => handleHome()}>
                Home
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </ThemeProvider>
  );
};

export default Loggedoutmenu;
