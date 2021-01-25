import React, { Component } from 'react';
import { Link } from '@reach/router';

import { getArticle, delArticle } from '../Utils/api';
import { UserContext } from '../Contexts/UserContext';
import { formatDate } from '../Utils/utils';

import LoadSpinner from './LoadSpinner';
import ErrorMsg from './ErrorMsg';
import CommentList from './CommentList/CommentList';
import Votes from './Votes';
import SidePanel from './SidePanel';
import Breakpoint from '../Responsive/breakpoint';

class Article extends Component {
  state = {
    article: {},
    isLoading: true,
    hasError: false,
    errMsg: '',
    username: null,
  };

  componentDidMount = () => {
    const { articleId } = this.props;
    const { user } = this.context;
    const username = user ? user.username : null;

    this.setState({ username });

    this.loadArticle(articleId);
  };

  componentDidUpdate = (prevProps) => {
    const { articleId } = this.props;
    if (articleId !== prevProps.articleId) this.loadArticle(articleId);

    const { user } = this.context;
    const username = user ? user.username : null;
    if (username !== this.state.username) this.setState({ username });
  };

  loadArticle = async (articleId) => {
    try {
      const article = await getArticle(articleId);
      this.setState({
        article,
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

  removeArticle = async (articleId) => {
    const { showDelModal } = this.props;

    try {
      await delArticle(articleId);
      showDelModal(true, 'Article Deleted', 'Back to articles', '/');
    } catch (err) {
      alert('Error deleting article');
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
      article_id,
      title,
      body,
      author,
      comment_count,
      created_at,
      topic,
      votes,
    } = this.state.article;

    const { username, isLoading, hasError, errMsg } = this.state;

    // Set main content of page according to whether we are loading or if an error has been thrown
    let mainContent;

    if (isLoading) {
      mainContent = <LoadSpinner />;
    } else if (hasError) {
      mainContent = <ErrorMsg errorMsg={errMsg} />;
    } else {
      mainContent = (
        <>
          <div className="article box">
            <div className="article__info">
              <Breakpoint screen="deskTab">
                <p>
                  Posted by {author} {formatDate(created_at)}
                </p>
              </Breakpoint>
              <Breakpoint screen="phone">
                <p>
                  {author} {formatDate(created_at)}
                </p>
              </Breakpoint>
              <Votes type="article" id={article_id} votes={votes} />
            </div>

            <div className="article__body">
              <p>{body}</p>
              <Breakpoint screen="tabPhone">
                {author === username && (
                  <button
                    className="subButton"
                    onClick={() => this.removeArticle(article_id)}
                  >
                    Delete article
                  </button>
                )}
              </Breakpoint>
            </div>

            <div className="article__comments">
              <CommentList
                articleId={article_id}
                user={username}
                commentCount={comment_count}
              />
            </div>
          </div>

          <Breakpoint screen="desktop">
            <div className="sidepanel">
              <SidePanel topic={topic} />

              {author === username && (
                <button
                  className="mainButton"
                  onClick={() => this.removeArticle(article_id)}
                >
                  Delete article
                </button>
              )}

              <Link
                to={topic ? `/articles/${topic}` : '/'}
                className="sidepanel__link"
              >
                <button className="mainButton">
                  <span className="mainButton__text">Back to articles</span>
                </button>
              </Link>
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

Article.contextType = UserContext;

export default Article;
