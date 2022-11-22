import { ThemeProvider } from '@emotion/react';
import '../assets/styles/navbar.css';
import '../assets/styles/loggedoutmenu.css';
import Button from '@mui/material/Button';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';

const Loggedoutmenu = ({ expandHamburger, setExpandHamburger }) => {
  const navigation = useNavigate();

  const handleHome = () => {
    console.log();
    navigation('/');
    setExpandHamburger(!expandHamburger);
  };

  const handleSignup = () => {
    console.log();
    navigation('/signup');
    setExpandHamburger(!expandHamburger);
  };

  const handleLogin = () => {
    console.log();
    navigation('/login');
    setExpandHamburger(!expandHamburger);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="loggedout-menu-drawer" id={expandHamburger ? 'active' : null}>
        <nav>
          <ul>
            <li>
              <Button
                className="login-btn"
                variant="contained"
                sx={{ width: '329px', height: '50px', marginLeft: '1rem', marginRight: '1rem' }}
                onClick={() => handleLogin()}>
                Log in
              </Button>
            </li>
            <li>
              <Button
                className="signup-btn"
                variant="outlined"
                sx={{ width: '329px', height: '50px', marginLeft: 'auto' }}
                onClick={() => handleSignup()}>
                Sign up
              </Button>
            </li>
            <li>
              <Button
                variant="txt"
                sx={{ width: '329px', height: '50px' }}
                onClick={() => handleHome()}>
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
