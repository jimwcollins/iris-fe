import React, { Component } from 'react';
import { getArticleList } from '../api';
import ArticleCard from './ArticleList/ArticleCard';
import LoadSpinner from './LoadSpinner';
import ErrorMsg from './ErrorMsg';
import ArticleSort from './ArticleList/ArticleSort';
import SidePanel from './SidePanel';

class ArticleList extends Component {
  state = {
    topic: this.props.topic,
    articles: [],
    articleCount: 0,
    isLoading: true,
    hasError: false,
    errMsg: ''
  };

  componentDidMount = () => {
    const { topic } = this.state;
    this.loadArticleList(topic);
  };

  componentDidUpdate = (prevProps) => {
    const { topic } = this.props;
    const isNew = topic !== prevProps.topic;

    if (isNew) {
      this.loadArticleList(topic);
    }
  };

  loadArticleList = async (topic, sortBy, order) => {
    try {
      const { articles, total_count } = await getArticleList(
        topic,
        sortBy,
        order
      );

      this.setState({
        topic,
        articles,
        articleCount: total_count,
        isLoading: false
      });
    } catch (err) {
      const {
        response: { status, statusText }
      } = err;

      this.setState({
        isLoading: false,
        hasError: true,
        errMsg: `${status}: ${statusText}`
      });
    }
  };

  // Capitalise the title
  formatTitle = (title) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  render() {
    const {
      articles,
      topic,
      articleCount,
      isLoading,
      hasError,
      errMsg
    } = this.state;

    const title = topic ? this.formatTitle(topic) : 'Welcome To The Iris!';

    if (hasError) return <ErrorMsg errorMsg={errMsg} />;

    console.log('Topic in ArticleList', topic);

    return (
      <main>
        <h2 className="articles__header">{title}</h2>

        <div className="articles">
          <ArticleSort
            articleCount={articleCount}
            topic={topic}
            loadArticleList={this.loadArticleList}
          />
          {isLoading ? (
            <LoadSpinner />
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
        <SidePanel topic={topic} />
      </main>
    );
  }
}

export default ArticleList;
