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
        <div className="articles">
          <h2>{topic || 'All articles'}</h2>
          {isLoading ? (
            'Loading articles...'
          ) : (
            <ul className="articles__list">
              {articles.map((article) => {
                return (
                  <ArticleCard key={article.article_id} article={article} />
                );
              })}
            </ul>
          )}
        </div>
        <div className="side-panel">Side List</div>
      </main>
    );
  }
}

export default ArticleList;
