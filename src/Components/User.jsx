import React, { Component } from 'react';
import { UserContext } from '../Contexts/UserContext';
import UserLogin from './User/UserLogin';

class User extends Component {
  state = {
    showLogin: false
  };

  showLogin = () => {
    this.setState({ showLogin: true });
  };

  render() {
    const { user, login, logout } = this.context;
    const { showLogin } = this.state;

    if (user) {
      return (
        <div className="user">
          <p className="user__display">Logged in as {user.name}</p>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      );
    }

    if (showLogin) {
      return <UserLogin login={login} />;
    } else {
      return (
        <div className="user">
          <button className="btn" onClick={this.showLogin}>
            login
          </button>
        </div>
      );
    }
  }
}

User.contextType = UserContext;

export default User;
