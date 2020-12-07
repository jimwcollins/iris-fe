import './App.css';
import { Router } from '@reach/router';
import Title from './Components/Title';
import Nav from './Components/Nav';
import ArticleList from './Components/ArticleList';
import Article from './Components/Article';

function App() {
  return (
    <div className="App">
      <Title />
      <Nav />
      <Router>
        <ArticleList path="/" />
        <ArticleList path="/articles/:topic" />
        <Article path="/article" />
      </Router>
    </div>
  );
}

export default App;
