import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import '../assets/styles/authnavbar.css';
import theme from '../theme';
import Hamburger from './hamburger';
import Authnavbarmenu from './authnavbarmenu';
import logo from '../../src/assets/images/logo.png';

const AuthnavbarMobile = ({ authStatus }) => {
  const [expandHamburger, setExpandHamburger] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <header id="mobile-header">
        <div id="navbar">
          <a href="/" className="logo">
            <img src={logo} className="logo-img" />
          </a>
          <Hamburger expandHamburger={expandHamburger} setExpandHamburger={setExpandHamburger} />
          <Authnavbarmenu
            expandHamburger={expandHamburger}
            setExpandHamburger={setExpandHamburger}
            authStatus={authStatus}
          />
        </div>
      </header>
    </ThemeProvider>
  );
};

export default AuthnavbarMobile;
