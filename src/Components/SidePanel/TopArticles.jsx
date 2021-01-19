import React, { Component } from 'react';
import { getArticleList } from '../../Utils/api';
import { Link } from '@reach/router';

class TopArticles extends Component {
  state = {
    topArticles: [],
    isLoading: true,
    hasError: false,
    errMsg: '',
  };

  componentDidMount = () => {
    const { topicSlug } = this.props;
    this.fetchArticleList(topicSlug);
  };

  componentDidUpdate = (prevProps) => {
    const { topicSlug } = this.props;
    if (topicSlug !== prevProps.topicSlug) {
      this.fetchArticleList(topicSlug);
    }
  };

  fetchArticleList = async (topicSlug) => {
    try {
      const { articles } = await getArticleList(topicSlug, 'votes');

      this.setState({
        topArticles: articles,
        isLoading: false,
      });
    } catch (err) {
      console.log('TopArticlesErr', err);
      const {
        response: { status, statusText },
      } = err;

      this.setState({
        isLoading: false,
        hasError: true,
        errMsg: `${status}: ${statusText}`,
      });
    }
  };

  render() {
    const { topArticles } = this.state;
    return (
      <div className="top-articles">
        <p className="top-articles__header">People are loving...</p>
        <ul className="top-articles__list">
          {topArticles.map((article) => {
            return (
              <Link
                key={article.article_id}
                to={`/article/${article.article_id}`}
                className="articles__link"
              >
                <li className="top-articles__item">{article.title}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TopArticles;
