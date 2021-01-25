import React, { useState, useEffect } from 'react';
import icons from '../../images/iris-icons.svg';

function ArticleSort({ articleCount, loadArticleList, topic }) {
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    loadArticleList(topic, sortBy, order);
  }, [sortBy, order, loadArticleList, topic]);

  const handleOrder = () => {
    order === 'desc' ? setOrder('asc') : setOrder('desc');
  };

  return (
    <div className="articles-sort">
      <p className="articles__count">{articleCount} articles</p>

      <div className="articles-sort__controls">
        <select
          name="sortBy"
          onChange={(event) => setSortBy(event.target.value)}
          value={sortBy}
          className="articles-sort__select"
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>

        <button className="articles-sort__order" onClick={handleOrder}>
          <svg>
            {order === 'desc' ? (
              <use href={icons + '#icon-sort-amount-desc'}></use>
            ) : (
              <use href={icons + '#icon-sort-amount-asc'}></use>
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ArticleSort;
