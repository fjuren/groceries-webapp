import { ThemeProvider } from '@emotion/react';
import '../assets/styles/navbar.css';
import Button from '@mui/material/Button';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigation = useNavigate();
  const handleClick = (e) => {
    console.log(e);
    navigation('/login');
  };
  return (
    <ThemeProvider theme={theme}>
      <header id="desktop-header">
        <div id="navbar">
          <a href="" className="logo"></a>
          <nav className="menu">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <Button variant="outlined" sx={{ width: '6rem' }} onClick={(e) => handleClick(e)}>
                  Log in
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </ThemeProvider>
  );
};

export default Navbar;
