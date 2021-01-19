import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';
import Title from './Components/Title';
import Nav from './Components/Nav/Nav';
import ArticleList from './Components/ArticleList/ArticleList';
import Article from './Components/Article';
import ErrorMsg from './Components/ErrorMsg';
import { UserContext } from './Contexts/UserContext';
import { getUser } from './Utils/api';
import NewArticle from './Components/NewArticle';
import Modal from './Components/Modal';
import LoginModal from './Components/User/LoginModal';

class App extends Component {
  state = {
    user: null,
    showLoginModal: false,
    modal: {
      showModal: false,
      title: '',
      message: '',
      navTo: '',
    },
  };

  login = async (newuser) => {
    // Retrieve user details or throw error if doesn't exist in db
    try {
      const { user } = await getUser(newuser);
      this.setState({ user, showLoginModal: false });
    } catch (err) {
      alert('Error logging in');
      console.log(err);
    }
  };

  cancelLogin = () => {
    this.setState({ showLoginModal: false });
  };

  logout = () => {
    this.setState({ user: null });
  };

  modalHandler = (showModal, title, message, navTo) => {
    this.setState({ modal: { showModal, title, message, navTo } });
  };

  loginModalHandler = (showLoginModal) => {
    this.setState({ showLoginModal });
  };

  render() {
    const { user, showLoginModal, modal } = this.state;

    return (
      <UserContext.Provider
        value={{
          user,
          login: this.login,
          logout: this.logout,
          showLoginModal: this.loginModalHandler,
          cancelLogin: this.cancelLogin,
        }}
      >
        <div className="App grid">
          <Title />
          <Nav />
          <Modal
            showModal={modal.showModal}
            modalHandler={this.modalHandler}
            title={modal.title}
            message={modal.message}
            navTo={modal.navTo}
          />
          <LoginModal
            showLoginModal={showLoginModal}
            loginModalHandler={this.loginModalHandler}
          />
          <Router className="content" primary={false}>
            <ArticleList path="/" />
            <ArticleList path="/articles/:topic" />
            <NewArticle
              path="/article/new/:topic"
              showNewModal={this.modalHandler}
            />
            <Article
              path="/article/:articleId"
              user={user}
              showDelModal={this.modalHandler}
            />
            <ErrorMsg default errorMsg="404: page not found" />
          </Router>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
