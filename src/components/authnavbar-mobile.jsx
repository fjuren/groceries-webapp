import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';
import { ThemeProvider } from '@emotion/react';
import '../assets/styles/authnavbar.css';
import theme from '../theme';
import Hamburger from './hamburger';
import Authnavbarmenu from './authnavbarmenu';
import logo from '../../src/assets/images/logo.png';

const AuthnavbarMobile = ({ setAuthStatus }) => {
  const [expandHamburger, setExpandHamburger] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const firstName = user.displayName.split(' ')[0];
        console.log(firstName);
        // document.getElementById('user-firstName').style.color = 'yellow';
        document.getElementById('user-firstName-mobile').textContent = 'Hi, ' + firstName + '!';
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <header id="mobile-header">
        <div id="navbar">
          <a href="/" className="logo">
            <img src={logo} className="logo-img" />
          </a>
          <span id="user-firstName-mobile"></span>
          <Hamburger expandHamburger={expandHamburger} setExpandHamburger={setExpandHamburger} />
          <Authnavbarmenu
            expandHamburger={expandHamburger}
            setExpandHamburger={setExpandHamburger}
            setAuthStatus={setAuthStatus}
          />
        </div>
      </header>
    </ThemeProvider>
  );
};

export default AuthnavbarMobile;
