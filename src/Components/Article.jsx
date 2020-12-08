import React, { Component } from 'react';
import { getArticle } from '../api';
import LoadSpinner from './LoadSpinner';

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

  loadArticle = async (articleId) => {
    try {
      const article = await getArticle(articleId);
      this.setState({
        article,
        isLoading: false
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {
      title,
      body,
      topic,
      votes,
      author,
      comment_count,
      created_at
    } = this.state.article;

    const { isLoading } = this.state;

    if (isLoading) return <LoadSpinner />;

    return (
      <main>
        <div className="article">
          <h2 className="article__title">{title}</h2>
          <p className="article__author">
            Posted by {author} at {created_at}
          </p>
          <p className="article__body">{body}</p>
          <div className="article__statBar">
            <p className="article__stat">{comment_count} comments</p>
          </div>
        </div>
        <div className="side-panel">Side List</div>
      </main>
    );
  }
}

export default Article;
