import { ThemeProvider } from '@emotion/react';
import '../assets/styles/navbar.css';
import '../assets/styles/loggedoutmenu.css';
import Button from '@mui/material/Button';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';

const Loggedoutmenu = ({ expandHamburger }) => {
  const navigation = useNavigate();

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
      <nav className="loggedout-menu" id={expandHamburger ? 'active' : null}>
        <ul>
          <li>
            <Button variant="txt" sx={{ width: '6rem' }} onClick={() => handleHome()}>
              Home
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
            <Button
              className="login-btn"
              variant="outlined"
              sx={{ width: '6rem', marginLeft: '1rem', marginRight: '1rem' }}
              onClick={() => handleLogin()}>
              Log in
            </Button>
          </li>
        </ul>
      </nav>
    </ThemeProvider>
  );
};

export default Loggedoutmenu;
