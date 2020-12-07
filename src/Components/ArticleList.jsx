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
    const { articles } = await fetchArticles(topic);

    this.setState({ topic, articles, isLoading: false });
  };

  componentDidUpdate = async (prevProps) => {
    const { topic } = this.props;
    const isNew = topic !== prevProps.topic;

    if (isNew) {
      const { articles } = await fetchArticles(topic);
      this.setState({ topic, articles, isLoading: false });
    }
  };

  render() {
    const articles = this.state.articles;
    const topic = this.state.topic;
    const isLoading = this.state.isLoading;

    return (
      <main>
        <h2>{topic || 'All articles'}</h2>
        {isLoading ? (
          'Loading articles...'
        ) : (
          <ul>
            {articles.map((article) => {
              return <ArticleCard key={article.article_id} article={article} />;
            })}
          </ul>
        )}
      </main>
    );
  }
}

export default ArticleList;
