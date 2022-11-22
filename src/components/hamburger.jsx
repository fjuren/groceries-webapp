import React from 'react';
import '../assets/styles/hamburger.css';

const Hamburger = ({ expandHamburger, setExpandHamburger }) => {
  const animateBurger = () => {
    setExpandHamburger(!expandHamburger);
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
