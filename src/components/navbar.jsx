import { ThemeProvider } from '@emotion/react';
import '../assets/styles/navbar.css';
import Button from '@mui/material/Button';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigation = useNavigate();

  const handleHome = (e) => {
    console.log(e);
    navigation('/');
  };

  const handleSignup = (e) => {
    console.log(e);
    navigation('/signup');
  };

  const handleLogin = (e) => {
    console.log(e);
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
                <Button variant="txt" sx={{ width: '6rem' }} onClick={(e) => handleHome(e)}>
                  Home
                </Button>
              </li>
            </ul>
          </nav>
          <Button
            className="signup-btn"
            variant="outlined"
            sx={{ width: '6rem', marginLeft: 'auto' }}
            onClick={(e) => handleSignup(e)}>
            Sign up
          </Button>
          <Button
            className="login-btn"
            variant="outlined"
            sx={{ width: '6rem', marginLeft: '1rem', marginRight: '1rem' }}
            onClick={(e) => handleLogin(e)}>
            Log in
          </Button>
        </div>
      </header>
    </ThemeProvider>
  );
};

export default Navbar;
