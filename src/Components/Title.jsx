import React from 'react';
import { Link } from '@reach/router';
import logo from '../images/EyeLogo.jpg';

const Header = () => {
  return (
    <Link to="/" className="title-link">
      <h1 className="title__text">The</h1>
      <img src={logo} className="logo" alt="iris logo" />
      <h1 className="title__text">Iris</h1>
    </Link>
  );
};

export default Header;
