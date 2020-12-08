import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ article }) => {
  return (
    <li className="articles__card">
      <Link to={`/article/${article.article_id}`} className="articles__link">
        <h3>{article.title}</h3>
        <p>{article.body}</p>
      </Link>
    </li>
  );
};

export default ArticleCard;
