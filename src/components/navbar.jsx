import { ThemeProvider } from '@emotion/react';
import '../assets/styles/navbar.css';
import Button from '@mui/material/Button';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
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
      <header id="desktop-header">
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
            </ul>
          </nav>
          <Button
            className="signup-btn"
            variant="outlined"
            sx={{ width: '6rem', marginLeft: 'auto' }}
            onClick={() => handleSignup()}>
            Sign up
          </Button>
          <Button
            className="login-btn"
            variant="outlined"
            sx={{ width: '6rem', marginLeft: '1rem', marginRight: '1rem' }}
            onClick={() => handleLogin()}>
            Log in
          </Button>
        </div>
      </header>
    </ThemeProvider>
  );
};

export default Navbar;
