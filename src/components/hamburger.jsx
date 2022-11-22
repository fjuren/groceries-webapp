import React from 'react';
import '../assets/styles/hamburger.css';

const Hamburger = ({ expandHamburger, setExpandHamburger }) => {
  const animateBurger = () => {
    setExpandHamburger(!expandHamburger);
    // document.getElementById('loggedout-menu-drawer').style.width = '9rem';
  };

  return (
    <div
      className="burger"
      id={expandHamburger ? 'active' : null}
      onClick={(e) => animateBurger(e)}>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </div>
  );
};

export default Hamburger;
