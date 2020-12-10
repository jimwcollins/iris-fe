import React, { Component } from 'react';
import { getCommentList, postNewComment, deleteComment } from '../api';
import CommentCard from './CommentList/CommentCard';
import LoadSpinner from './LoadSpinner';
import ErrorMsg from './ErrorMsg';
import CommentForm from './CommentList/CommentForm';

class CommentList extends Component {
  state = {
    user: this.props.user,
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

  componentDidUpdate = (prevProps) => {
    const { articleId } = this.props;

    if (articleId !== prevProps.articleId) this.loadComments(articleId);
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
    const { user, articleId } = this.state;

    try {
      const newComment = await postNewComment(user, articleId, comment);
      this.setState((currentState) => {
        return {
          comments: [newComment, ...currentState.comments]
        };
      });
    } catch (err) {
      const {
        response: { status, statusText }
      } = err;

      this.setState({
        hasError: true,
        errMsg: `${status}: ${statusText}`
      });
    }
  };

  removeComment = async (commentId) => {
    try {
      await deleteComment(commentId);

      this.setState((currentState) => {
        const oldComments = [...currentState.comments];
        const delIndex = oldComments.findIndex(
          (comment) => comment.comment_id === commentId
        );

        oldComments.splice(delIndex, 1);

        return {
          comments: oldComments
        };
      });
    } catch (err) {
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
    const { user, comments, isLoading, hasError, errMsg } = this.state;

    if (isLoading) return <LoadSpinner />;
    if (hasError) return <ErrorMsg errorMsg={errMsg} />;

    return (
      <div className="commentList">
        <CommentForm addComment={this.addComment} />

        <ul className="commentList__list">
          {comments.map((comment) => {
            return (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                user={user}
                removeComment={() => this.removeComment(comment.comment_id)}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default CommentList;
