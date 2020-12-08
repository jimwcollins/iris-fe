import React from 'react';

const CommentCard = ({ comment }) => {
  return (
    <li className="commentList__card">
      <p className="comment__info">
        {comment.author} • {comment.created_at}
      </p>
      <p className="comment__body">{comment.body}</p>
    </li>
  );
};

export default CommentCard;
