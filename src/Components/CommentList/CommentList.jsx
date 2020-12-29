import React, { Component } from 'react';
import { getCommentList, postNewComment, deleteComment } from '../../Utils/api';
import CommentCard from './CommentCard';
import LoadSpinner from '../LoadSpinner';
import ErrorMsg from '../ErrorMsg';
import CommentForm from './CommentForm';
import { UserContext } from '../../Contexts/UserContext';

class CommentList extends Component {
  state = {
    user: null,
    articleId: null,
    comments: [],
    isLoading: true,
    hasError: false,
    errMsg: ''
  };

  componentDidMount = () => {
    const { articleId } = this.props;
    const { user } = this.context;
    this.setState({ user });

    this.loadComments(articleId);
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { user } = this.context;
    const prevUser = prevState.user;
    const username = user ? user.username : null;
    const prevUsername = prevUser ? prevUser.username : null;

    if (username !== prevUsername) this.setState({ user });

    const { articleId } = this.props;
    if (articleId !== prevProps.articleId) {
      this.loadComments(articleId);
    }
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
    const { username } = user;

    try {
      const newComment = await postNewComment(username, articleId, comment);
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
    const username = user ? user.username : null;

    if (isLoading) return <LoadSpinner />;
    if (hasError) return <ErrorMsg errorMsg={errMsg} />;

    return (
      <div className="commentList">
        {username ? (
          <CommentForm username={username} addComment={this.addComment} />
        ) : (
          <p className="commentList__newComment__head">
            Please login to comment
          </p>
        )}

        <ul className="commentList__list">
          {comments.map((comment) => {
            return (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                username={username}
                removeComment={() => this.removeComment(comment.comment_id)}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

CommentList.contextType = UserContext;

export default CommentList;
