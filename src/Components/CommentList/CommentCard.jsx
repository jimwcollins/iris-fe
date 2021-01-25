import React from 'react';
import { formatDate } from '../../Utils/utils';
import Votes from '../Votes';
import Breakpoint from '../../Responsive/breakpoint';

const CommentCard = ({ comment, username, removeComment }) => {
  const { comment_id, author, created_at, votes, body } = comment;

  return (
    <li className="commentList__card">
      <div className="comment__info">
        <Breakpoint screen="deskTab">
          <p className="comment__author">
            Posted by {author} {formatDate(created_at)}
          </p>
        </Breakpoint>
        <Breakpoint screen="phone">
          <p className="comment__author">
            {author} {formatDate(created_at)}
          </p>
        </Breakpoint>

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
