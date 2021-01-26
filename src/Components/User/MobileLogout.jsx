import React, { useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';

function MobileLogout({ handleMobLogout }) {
  const { user, logout } = useContext(UserContext);

  const logoutUser = () => {
    handleMobLogout();
    logout();
  };

  return (
    <div className="navMob__panel grid">
      <div className="navMob__logout">
        <p className="navMob__logout__text">Log out {user.name}?</p>
        <div className="navMob__logout__btns">
          <button className="navMob__panel__btn" onClick={logoutUser}>
            <p>LOGOUT</p>
          </button>
          <button className="navMob__panel__btn" onClick={handleMobLogout}>
            <p>CANCEL</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileLogout;
