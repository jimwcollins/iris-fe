import React, { Component } from 'react';
import { getArticle, delArticle } from '../api';
import LoadSpinner from './LoadSpinner';
import ErrorMsg from './ErrorMsg';
import CommentList from './CommentList';
import Votes from './Votes';
import SidePanel from './SidePanel';
import { UserContext } from '../Contexts/UserContext';

class Article extends Component {
  state = {
    article: {},
    isLoading: true,
    hasError: false,
    errMsg: ''
  };

  componentDidMount = () => {
    const { articleId } = this.props;
    this.loadArticle(articleId);
  };

  componentDidUpdate = (prevProps) => {
    const { articleId } = this.props;
    if (articleId !== prevProps.articleId) this.loadArticle(articleId);
  };

  loadArticle = async (articleId) => {
    try {
      const article = await getArticle(articleId);
      this.setState({
        article,
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

  removeArticle = async (articleId) => {
    try {
      await delArticle(articleId);
    } catch (err) {
      alert('Error deleting article');
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

  render() {
    const {
      article_id,
      title,
      body,
      author,
      comment_count,
      created_at,
      topic,
      votes
    } = this.state.article;

    const { user, isLoading, hasError, errMsg } = this.state;

    if (isLoading) return <LoadSpinner />;
    if (hasError) return <ErrorMsg errorMsg={errMsg} />;

    return (
      <main>
        <h2 className="articles__header">{title}</h2>
        <div className="article">
          <div className="article__info">
            <p className="article__author">
              Posted by {author} at {created_at}
            </p>
            <Votes type="article" id={article_id} votes={votes} />
          </div>

          <p className="article__body">{body}</p>
          <div className="article__statBar">
            <p className="article__stat">{comment_count} comments</p>
          </div>
          {comment_count > 0 && (
            <CommentList articleId={article_id} user={user} />
          )}
        </div>

        <div className="sidepanel">
          <SidePanel topic={topic} />

          <button
            className="sidepanel__btn"
            onClick={() => this.removeArticle(article_id)}
          >
            Delete article
          </button>
        </div>
      </main>
    );
  }
}

Article.contextType = UserContext;

export default Article;
