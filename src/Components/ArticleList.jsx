import React, { Component } from 'react';
import { fetchArticles } from '../api';
import ArticleCard from './ArticleList/ArticleCard';

class ArticleList extends Component {
  state = {
    topic: '',
    articles: [],
    articleCount: 0,
    isLoading: true
  };

  componentDidMount = async () => {
    const { topic } = this.props;
    const { articles, total_count } = await fetchArticles(topic);

    this.setState({
      topic,
      articles,
      articleCount: total_count,
      isLoading: false
    });
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
    const { articles, topic, articleCount, isLoading } = this.state;

    return (
      <main>
        <div className="articles">
          <h2 className="articles__header">{topic || 'All articles'}</h2>
          <p className="articles__count">
            Now showing 10 of {articleCount} articles
          </p>
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
