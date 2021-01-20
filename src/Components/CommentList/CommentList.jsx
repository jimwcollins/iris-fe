import React, { Component } from 'react';
import { getCommentList, postNewComment, deleteComment } from '../../Utils/api';
import CommentCard from './CommentCard';
import LoadSpinner from '../LoadSpinner';
import ErrorMsg from '../ErrorMsg';
import CommentForm from './CommentForm';
import { UserContext } from '../../Contexts/UserContext';
import icons from '../../images/iris-icons.svg';

class CommentList extends Component {
  state = {
    user: null,
    articleId: null,
    comments: [],
    commentCount: 0,
    isLoading: true,
    hasError: false,
    errMsg: '',
  };

  componentDidMount = () => {
    const { articleId, commentCount } = this.props;
    const { user } = this.context;
    this.setState({ user, articleId, commentCount });

    if (commentCount > 0) this.loadComments(articleId);
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { user } = this.context;
    const prevUser = prevState.user;
    const username = user ? user.username : null;
    const prevUsername = prevUser ? prevUser.username : null;

    if (username !== prevUsername) this.setState({ user });

    const { articleId } = this.props;
    if (articleId !== prevProps.articleId && this.commentCount > 0) {
      this.loadComments(articleId);
    }
  };

  loadComments = async (articleId) => {
    try {
      const comments = await getCommentList(articleId);
      this.setState({
        comments,
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

  addComment = async (comment) => {
    const { user, articleId } = this.state;
    const { username } = user;

    try {
      const newComment = await postNewComment(username, articleId, comment);
      this.setState((currentState) => {
        return {
          isLoading: false,
          comments: [newComment, ...currentState.comments],
          commentCount: currentState.commentCount + 1,
        };
      });
    } catch (err) {
      const {
        response: { status, statusText },
      } = err;

      this.setState({
        hasError: true,
        errMsg: `${status}: ${statusText}`,
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
          comments: oldComments,
          commentCount: currentState.commentCount - 1,
        };
      });
    } catch (err) {
      const {
        response: { status, statusText },
      } = err;

      this.setState({
        hasError: true,
        errMsg: `${status}: ${statusText}`,
      });
    }
  };

  render() {
    const {
      user,
      comments,
      commentCount,
      isLoading,
      hasError,
      errMsg,
    } = this.state;

    const username = user ? user.username : null;

    const { showLoginModal } = this.context;

    if (hasError) return <ErrorMsg errorMsg={errMsg} />;

    return (
      <div className="commentList">
        <div className="commentList__stats">
          <svg class="article__icon">
            <use href={icons + '#icon-message'}></use>
          </svg>
          <p className="commentList__commentCount">{commentCount} comments</p>
        </div>
        {username ? (
          <CommentForm username={username} addComment={this.addComment} />
        ) : (
          <div className="commentList__login">
            <p> Please login to comment</p>
            <button className="subButton" onClick={showLoginModal}>
              Login
            </button>
          </div>
        )}

        {commentCount > 0 &&
          (isLoading ? (
            <LoadSpinner />
          ) : (
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
          ))}
      </div>
    );
  }
}

CommentList.contextType = UserContext;

export default CommentList;
