import './App.css';
import { Router } from '@reach/router';
import Title from './Components/Title';
import Nav from './Components/Nav';
import ArticleList from './Components/ArticleList';
import Article from './Components/Article';
import ErrorMsg from './Components/ErrorMsg';

import React, { Component } from 'react';

class App extends Component {
  state = {
    user: 'jessjelly'
  };

  render() {
    const { user } = this.state;

    return (
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
    );
  }
}

export default App;
