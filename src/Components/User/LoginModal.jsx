import React, { useState, useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';

const LoginModal = (props) => {
  const [userLogin, setUserLogin] = useState('');
  const { login } = useContext(UserContext);

  const handleChange = (event) => {
    setUserLogin(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserLogin('');
    login(userLogin);
  };

  let modalBgClass = 'modal__bg';
  modalBgClass += props.showLoginModal ? ' modal__bg--show' : '';
  let modalBoxClass = 'login__modal modal__box';
  modalBoxClass += props.showLoginModal ? ' modal__box--show' : '';

  return (
    <div className={modalBgClass}>
      <div className={modalBoxClass}>
        <h3 className="login__title">Login</h3>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="userLogin"
            placeholder="Please enter your username"
            value={userLogin}
            onChange={handleChange}
            className="login__input"
            required
          ></input>
          <input type="submit" value="login" className="btn"></input>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
