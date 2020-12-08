import React, { Component } from 'react';
import CommentCard from './CommentList/CommentCard';

class CommentList extends Component {
  state = {
    comments: [
      {
        comment_id: 297,
        author: 'cooljmessy',
        article_id: 8,
        votes: 10,
        created_at: '2016-01-24T16:00:55.807Z',
        body:
          'Harum veritatis neque nisi. Quos minima quasi enim praesentium ea voluptatum quae. Voluptatum quos repudiandae sed ipsum dolor hic quo nemo.'
      },
      {
        comment_id: 250,
        author: 'tickle122',
        article_id: 8,
        votes: 2,
        created_at: '2016-01-29T02:48:31.728Z',
        body:
          'Et inventore voluptas sit aliquid nihil et qui maxime sed. Consectetur sit voluptatem corrupti modi harum quia quia. Eius rerum tempora et.'
      }
    ],
    isLoading: true,
    hasError: false,
    errMsg: ''
  };

  render() {
    const { comments } = this.state;

    return (
      <div>
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
