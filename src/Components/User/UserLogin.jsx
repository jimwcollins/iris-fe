import React, { Component } from 'react';

class UserLogin extends Component {
  state = {
    userLogin: ''
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { login } = this.props;
    const { userLogin } = this.state;
    this.setState({ userLogin: '' });

    login(userLogin);
  };

  render() {
    return (
      <div className="navButton">
        <form className="nav__form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="userLogin"
            placeholder="username"
            value={this.state.userLogin}
            onChange={this.handleChange}
            className="nav__form__input"
          ></input>
          <input type="submit" value="login" className="navButton__btn"></input>
        </form>
      </div>
    );
  }
}

export default UserLogin;
