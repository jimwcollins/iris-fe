import React, { Component } from 'react';
import { getCommentList, postNewComment } from '../api';
import CommentCard from './CommentList/CommentCard';
import LoadSpinner from './LoadSpinner';
import ErrorMsg from './ErrorMsg';
import CommentForm from './CommentList/CommentForm';

class CommentList extends Component {
  state = {
    articleId: this.props.articleId,
    comments: [],
    isLoading: true,
    hasError: false,
    errMsg: ''
  };

  componentDidMount = () => {
    const { articleId } = this.props;
    this.loadComments(articleId);
  };

  loadComments = async (articleId) => {
    try {
      const comments = await getCommentList(articleId);
      this.setState({
        articleId,
        comments,
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

  addComment = async (comment) => {
    const { articleId } = this.state;
    try {
      const newComment = await postNewComment('jessjelly', articleId, comment);
      this.setState((currentState) => {
        return {
          comments: [newComment, ...currentState.comments]
        };
      });
    } catch (err) {
      console.log(err);
      const {
        response: { status, statusText }
      } = err;

      this.setState({
        hasError: true,
        errMsg: `${status}: ${statusText}`
      });
    }
  };

  render() {
    const { comments, isLoading, hasError, errMsg } = this.state;

    if (isLoading) return <LoadSpinner />;
    if (hasError) return <ErrorMsg errorMsg={errMsg} />;

    return (
      <div className="commentList">
        <CommentForm addComment={this.addComment} />

        <ul className="commentList__list">
          {comments.map((comment) => {
            return <CommentCard key={comment.comment_id} comment={comment} />;
          })}
        </ul>
      </div>
    );
  }
}

export default CommentList;
