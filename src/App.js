import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';
import Title from './Components/Title';
import Nav from './Components/Nav';
import ArticleList from './Components/ArticleList';
import Article from './Components/Article';
import ErrorMsg from './Components/ErrorMsg';
import { UserContext } from './Contexts/UserContext';

class App extends Component {
  state = {
    user: null
  };

  login = (newuser) => {
    this.setState({ user: newuser });
  };

  logout = () => {
    this.setState({ user: null });
  };

  render() {
    const { user } = this.state;

    return (
      <UserContext.Provider
        value={{ user, login: this.login, logout: this.logout }}
      >
        <div className="App grid">
          <Title />
          <Nav />
          <Router className="content" primary={false}>
            <ArticleList path="/" />
            <ArticleList path="/articles/:topic" />
            <Article path="/article/:articleId" user={user} />
            <ErrorMsg default errorMsg="404: page not found" />
          </Router>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
