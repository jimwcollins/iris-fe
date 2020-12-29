import React from 'react';
import { Link } from '@reach/router';
import icons from '../../images/iris-icons.svg';
import { formatDate } from '../../Utils/utils';

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/article/${article.article_id}`} className="articles__link">
      <li className="articles__card box">
        <div className="articles__card__title">
          <h3>{article.title}</h3>
        </div>
        <div className="articles__card__body">
          <p>{article.body}</p>
        </div>
        <div className="articles__card__info">
          <div className="articles__card__stats">
            <svg class="articles__card__icon">
              <use href={icons + '#icon-user'}></use>
            </svg>
            <p className="articles__card__author">
              Posted by {article.author}{' '}
              <span className="articles__card__time">
                {formatDate(article.created_at)}
              </span>
            </p>
          </div>
          <div className="articles__card__stats">
            <svg class="articles__card__icon">
              <use href={icons + '#icon-message'}></use>
            </svg>
            <p className="articles__card__stat">
              {article.comment_count} comments
            </p>
            <svg class="articles__card__icon">
              <use href={icons + '#icon-thumbs-up'}></use>
            </svg>
            <p className="articles__card__stat">{article.votes} votes</p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default ArticleCard;
