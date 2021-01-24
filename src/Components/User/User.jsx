import React, { useState, useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';

const User = () => {
  const [logoutMode, setLogoutMode] = useState(false);
  const [logoutHover, setLogoutHover] = useState(false);

  const { user, logout, showLoginModal } = useContext(UserContext);

  const handleLogout = () => {
    setLogoutMode(false);
    logout();
  };

  if (user) {
    return (
      <div className="user">
        {logoutMode ? (
          <>
            <p className="user__display">Log out {user.name}?</p>
            <button className="navButton" onClick={handleLogout}>
              LOGOUT
            </button>
            <button
              className="navButton navButton--cancel"
              onClick={setLogoutMode.bind(this, false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <p
              className={
                logoutHover
                  ? 'user__display'
                  : 'user__display user__display--hidden'
              }
            >
              Log out {user.name}?
            </p>
            <button
              className="navButton"
              onClick={setLogoutMode.bind(this, true)}
              onMouseEnter={setLogoutHover.bind(this, true)}
              onMouseLeave={setLogoutHover.bind(this, false)}
            >
              {user.username}
            </button>
          </>
        )}
      </div>
    );
  } else {
    return (
      <button className="navButton" onClick={showLoginModal.bind(this, true)}>
        Login
      </button>
    );
  }
};

export default User;
