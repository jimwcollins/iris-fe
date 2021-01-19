import React from 'react';
import { Link } from '@reach/router';
import logo from '../images/IrisLogo.png';

const Header = () => {
  return (
    <Link to="/" className="title-link">
      <img src={logo} className="logo" alt="iris logo" />
    </Link>
  );
};

export default Header;
