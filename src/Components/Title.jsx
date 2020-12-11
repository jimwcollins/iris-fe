import React from 'react';
import { Link } from '@reach/router';
import logo from '../images/EyeLogo.jpg';

const Header = () => {
  return (
    <Link to="/" className="title-link">
      <p className="title__text">The</p>
      <img src={logo} className="logo" alt="iris logo" />
      <p className="title__text">Iris</p>
    </Link>
  );
};

export default Header;
