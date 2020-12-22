import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';
import Title from './Components/Title';
import Nav from './Components/Nav';
import ArticleList from './Components/ArticleList/ArticleList';
import Article from './Components/Article';
import ErrorMsg from './Components/ErrorMsg';
import { UserContext } from './Contexts/UserContext';
import { getUser } from './api';
import NewArticle from './Components/NewArticle';

class App extends Component {
  state = {
    user: null
  };

  login = async (newuser) => {
    // Retrieve user details or throw error if doesn't exist in db
    try {
      const { user } = await getUser(newuser);
      this.setState({ user });
    } catch (err) {
      alert('Error logging in');
      console.log(err);
    }
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
            <NewArticle path="/article/new" />
            <Article path="/article/:articleId" user={user} />
            <ErrorMsg default errorMsg="404: page not found" />
          </Router>
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
