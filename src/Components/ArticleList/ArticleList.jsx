import React, { Component } from 'react';
import { Link } from '@reach/router';

import { UserContext } from '../../Contexts/UserContext';
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
    topicSlug: '',
    articles: [],
    articleCount: 0,
    isLoading: true,
    hasError: false,
    errMsg: '',
  };

  componentDidMount = () => {
    const { topicSlug } = this.props;
    this.loadArticleList(topicSlug);
    this.setState({ topicSlug });
  };

  componentDidUpdate = (prevProps) => {
    const { topicSlug } = this.props;
    if (topicSlug !== prevProps.topicSlug) {
      console.log('Loading for topic:', topicSlug);
      this.loadArticleList(topicSlug);
      this.setState({ topicSlug });
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
      topicSlug,
      articleCount,
      isLoading,
      hasError,
      errMsg,
    } = this.state;

    const { user } = this.context;

    const title = topicSlug ? formatTitle(topicSlug) : 'Welcome To The Iris';

    // Set main content of page according to whether we are loading or if an error has been thrown
    let mainContent;

    if (isLoading) {
      mainContent = <LoadSpinner />;
    } else if (hasError) {
      mainContent = <ErrorMsg errorMsg={errMsg} />;
    } else {
      mainContent = (
        <>
          <div className="articles">
            <ArticleSort
              articleCount={articleCount}
              topicSlug={topicSlug}
              loadArticleList={this.loadArticleList}
            />
            <ul className="articles__list">
              {articles.map((article) => {
                return (
                  <>
                    <Breakpoint screen="deskTab">
                      <ArticleCard
                        key={article.article_id}
                        article={article}
                        screen="deskTab"
                      />
                    </Breakpoint>
                    <Breakpoint screen="phone">
                      <ArticleCard
                        key={article.article_id}
                        article={article}
                        screen="phone"
                      />
                    </Breakpoint>
                  </>
                );
              })}
            </ul>
          </div>
          <Breakpoint screen="desktop">
            <div className="sidepanel">
              <SidePanel topicSlug={topicSlug} page="articleList" />
              {user && (
                <Link
                  to={topicSlug ? `/article/new/${topicSlug}` : '/article/new'}
                  className="sidepanel__link"
                >
                  <button className="mainButton">
                    <span className="mainButton__text">Post new article</span>
                  </button>
                </Link>
              )}
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

ArticleList.contextType = UserContext;

export default ArticleList;
