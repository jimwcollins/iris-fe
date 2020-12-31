import React, { useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';

const User = () => {
  const { user, logout, showLoginModal } = useContext(UserContext);

  if (user) {
    return (
      <div className="user">
        <p className="user__display">Logged in as {user.name}</p>
        <button className="navButton__outline navButton__btn" onClick={logout}>
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <button
        className="navButton__outline navButton__btn"
        onClick={showLoginModal.bind(this, true)}
      >
        Login
      </button>
    );
  }
};

export default User;
