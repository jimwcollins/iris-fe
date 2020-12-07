import React from 'react';

const ArticleCard = ({ article }) => {
  return (
    <li className="article-card">
      <h3>{article.title}</h3>
      <p>{article.body}</p>
    </li>
  );
};

export default ArticleCard;
