import React from 'react';
import { Link } from '@reach/router';

const Header = () => {
  return (
    <h1 className="title">
      <Link to="/" className="link">
        The Iris
      </Link>
    </h1>
  );
};

export default Header;
