import React from 'react';
import { formatDate } from '../../Utils/utils';
import Votes from '../Votes';

const CommentCard = ({ comment, username, removeComment }) => {
  const { comment_id, author, created_at, votes, body } = comment;

  return (
    <li className="commentList__card">
      <div className="comment__info">
        <p className="comment__author">
          Posted by {author} {formatDate(created_at)}
        </p>
        <Votes type="comment" id={comment_id} votes={votes} />
      </div>
      <p className="comment__body">{body}</p>
      {author === username && (
        <button
          className="subButton comment__deleteBtn"
          onClick={removeComment}
        >
          Delete
        </button>
      )}
    </li>
  );
};

export default CommentCard;
