import React, { Component } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import UserLogin from './UserLogin';

class User extends Component {
  render() {
    const { user, login, logout } = this.context;

    if (user) {
      return (
        <div className="user">
          <p className="user__display">Logged in as {user.name}</p>
          <button className="navBtn__btn" onClick={logout}>
            Logout
          </button>
        </div>
      );
    } else {
      return <UserLogin login={login} />;
    }
  }
}

User.contextType = UserContext;

export default User;
