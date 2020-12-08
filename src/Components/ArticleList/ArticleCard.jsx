import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/article/${article.article_id}`} className="articles__link">
      <li className="articles__card">
        <h3 className="articles__card__title">{article.title}</h3>
        <div className="articles__card__main">
          <p className="articles__card__body">{article.body}</p>
        </div>
        <div className="articles__card__info">
          <p className="articles__card__author">
            {article.author} •{' '}
            <span className="articles__card__time">{article.created_at}</span>
          </p>
          <div className="articles__card__stats">
            <p className="articles__card__stat">{article.votes} votes</p>
            <p className="articles__card__stat">
              {article.comment_count} comments
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default ArticleCard;
