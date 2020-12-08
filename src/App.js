import './App.css';
import { Router } from '@reach/router';
import Title from './Components/Title';
import Nav from './Components/Nav';
import ArticleList from './Components/ArticleList';
import Article from './Components/Article';
import ErrorMsg from './Components/ErrorMsg';

function App() {
  return (
    <div className="App">
      <Title />
      <Nav />
      <Router>
        <ArticleList path="/" />
        <ArticleList path="/articles/:topic" />
        <Article path="/article/:articleId" />
        <ErrorMsg default errorMsg="404: page not found" />
      </Router>
    </div>
  );
}

export default App;
