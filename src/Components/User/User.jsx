import React, { useState, useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import Breakpoint from '../../Responsive/breakpoint';

const User = ({ handleMobLogout }) => {
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
            <Breakpoint screen="desktop">
              <p
                className={
                  logoutHover
                    ? 'user__display'
                    : 'user__display user__display--hidden'
                }
              >
                Log out {user.name}?
              </p>
            </Breakpoint>
            <Breakpoint screen="deskTab">
              <button
                className="navButton"
                onClick={setLogoutMode.bind(this, true)}
                onMouseEnter={setLogoutHover.bind(this, true)}
                onMouseLeave={setLogoutHover.bind(this, false)}
              >
                {user.username}
              </button>
            </Breakpoint>
            <Breakpoint screen="phone">
              <button className="navButton" onClick={handleMobLogout}>
                {user.username}
              </button>
            </Breakpoint>
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
