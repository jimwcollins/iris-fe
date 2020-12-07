import React, { Component } from 'react';
import { fetchArticles } from '../api';
import ArticleCard from './ArticleList/ArticleCard';

class ArticleList extends Component {
  state = {
    topic: '',
    articles: [],
    isLoading: true
  };

  componentDidMount = async () => {
    const { topic } = this.props;
    console.log(topic);
    const { articles } = await fetchArticles(topic);

    this.setState({ topic, articles, isLoading: false });
  };

  render() {
    const articles = this.state.articles;
    const topic = this.state.topic;

    return (
      <main>
        <h2>{topic || 'All articles'}</h2>
        <ul>
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </ul>
      </main>
    );
  }
}

export default ArticleList;
