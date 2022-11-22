import React from 'react';
import { ThemeProvider } from '@emotion/react';
import '../assets/styles/navbar.css';
import Hamburger from './hamburger';
import Loggedoutmenu from './loggedoutmenu';
import theme from '../theme';
import { useState } from 'react';

const NavbarMobile = () => {
  const [expandHamburger, setExpandHamburger] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <header id="mobile-header">
        <div id="navbar">
          <a href="" className="logo">
            Mobile Nav
          </a>
          <Hamburger expandHamburger={expandHamburger} setExpandHamburger={setExpandHamburger} />
          <Loggedoutmenu
            expandHamburger={expandHamburger}
            setExpandHamburger={setExpandHamburger}
          />
        </div>
      </header>
    </ThemeProvider>
  );
};

export default NavbarMobile;
