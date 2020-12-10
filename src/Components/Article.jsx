import React, { Component } from 'react';
import { getArticle } from '../api';
import LoadSpinner from './LoadSpinner';
import ErrorMsg from './ErrorMsg';
import CommentList from './CommentList';
import Votes from './Votes';

class Article extends Component {
  state = {
    user: this.props.user,
    article: {},
    isLoading: true,
    hasError: false,
    errMsg: ''
  };

  componentDidMount = () => {
    const { articleId } = this.props;
    this.loadArticle(articleId);
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

      console.log(status);
      console.log(statusText);

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
      votes
    } = this.state.article;

    const { user, isLoading, hasError, errMsg } = this.state;

    if (isLoading) return <LoadSpinner />;
    if (hasError) return <ErrorMsg errorMsg={errMsg} />;

    return (
      <main>
        <div className="article">
          <h2 className="article__title">{title}</h2>

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
          <CommentList articleId={article_id} user={user} />
        </div>

        <div className="side-panel">Side List</div>
      </main>
    );
  }
}

export default Article;
