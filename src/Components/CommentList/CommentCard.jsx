import React from 'react';

const CommentCard = ({ comment, user, removeComment }) => {
  return (
    <li className="commentList__card">
      <p className="comment__info">
        {comment.author} • {comment.created_at}
      </p>
      <p className="comment__body">{comment.body}</p>
      {comment.author === user && (
        <button className="comment__delete-btn" onClick={removeComment}>
          Delete
        </button>
      )}
    </li>
  );
};

export default CommentCard;
