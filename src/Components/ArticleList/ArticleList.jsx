import React, { Component } from 'react';

import { getArticleList } from '../../Utils/api';
import { formatTitle } from '../../Utils/utils';

import ArticleCard from './ArticleCard';
import LoadSpinner from '../LoadSpinner';
import ErrorMsg from '../ErrorMsg';
import ArticleSort from './ArticleSort';
import SidePanel from '../SidePanel';
import Breakpoint from '../../Responsive/breakpoint';

class ArticleList extends Component {
  state = {
    topic: this.props.topic,
    articles: [],
    articleCount: 0,
    isLoading: true,
    hasError: false,
    errMsg: '',
  };

  componentDidMount = () => {
    const { topic } = this.state;
    this.loadArticleList(topic);
  };

  componentDidUpdate = (prevProps) => {
    const { topic } = this.props;
    if (topic !== prevProps.topic) this.loadArticleList(topic);
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
        isLoading: false,
      });
    } catch (err) {
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
    const {
      articles,
      topic,
      articleCount,
      isLoading,
      hasError,
      errMsg,
    } = this.state;

    let topicData;

    if (this.props.location.state) {
      topicData = this.props.location.state.topic;
    }

    const title = topic ? formatTitle(topic) : 'Welcome To The Iris';

    // Set main content of page according to whether we are loading or if an error has been thrown
    let mainContent;

    if (isLoading) {
      mainContent = <LoadSpinner />;
    } else if (hasError) {
      mainContent = <ErrorMsg errorMsg={errMsg} />;
    } else {
      mainContent = (
        <>
          <Breakpoint screen="deskTab">
            <div className="articles">
              <ArticleSort
                articleCount={articleCount}
                topic={topic}
                loadArticleList={this.loadArticleList}
                screen="deskTab"
              />
              <ul className="articles__list">
                {articles.map((article) => {
                  return (
                    <ArticleCard
                      key={article.article_id}
                      article={article}
                      screen="deskTab"
                    />
                  );
                })}
              </ul>
            </div>
            <Breakpoint screen="desktop">
              <SidePanel topicData={topicData} page="articleList" />
            </Breakpoint>
          </Breakpoint>
          <Breakpoint screen="phone">
            <div className="articles">
              <ArticleSort
                articleCount={articleCount}
                topic={topic}
                loadArticleList={this.loadArticleList}
                screen="phone"
              />
              <ul className="articles__list">
                {articles.map((article) => {
                  return (
                    <ArticleCard
                      key={article.article_id}
                      article={article}
                      screen="phone"
                    />
                  );
                })}
              </ul>
            </div>
          </Breakpoint>
        </>
      );
    }

    return (
      <>
        <h2 className="articles__header">{title}</h2>
        {mainContent}
      </>
    );
  }
}

export default ArticleList;
