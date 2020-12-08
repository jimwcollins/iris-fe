import React, { Component } from 'react';
import { getCommentList } from '../api';
import CommentCard from './CommentList/CommentCard';
import LoadSpinner from './LoadSpinner';

class CommentList extends Component {
  state = {
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
        comments,
        isLoading: false
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { comments, isLoading } = this.state;

    return (
      <div>
        {isLoading ? (
          <LoadSpinner />
        ) : (
          <ul className="commentList__list">
            {comments.map((comment) => {
              return <CommentCard key={comment.comment_id} comment={comment} />;
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default CommentList;
