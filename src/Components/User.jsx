import React, { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';

const User = () => {
  const { user, login, logout } = useContext(UserContext);

  if (user) {
    return (
      <button className="btn" onClick={logout}>
        {user}
      </button>
    );
  } else {
    return (
      <button className="btn" onClick={() => login('jessjelly')}>
        login
      </button>
    );
  }
};

export default User;
