import React, { useState } from 'react';
import icons from '../../images/iris-icons.svg';

const MobileSearch = (props) => {
  const [topicInput, setTopicInput] = useState('');
  const { topicSearch } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    topicSearch(topicInput);
    setTopicInput('');
  };

  return (
    <div className="navMob__search grid">
      <form className="navMob__search__form" onSubmit={handleSubmit}>
        <input
          className="navMob__search__input"
          type="text"
          name="searchTopics"
          value={topicInput}
          placeholder="Search for topics or show all"
          onChange={(event) => setTopicInput(event.target.value)}
          autoComplete="off"
        />

        <button
          className="navMob__search__submit"
          type="submit"
          onClick={handleSubmit}
        >
          {topicInput ? (
            <svg>
              <use href={icons + '#icon-magnifying-glass'}></use>
            </svg>
          ) : (
            <p>ALL</p>
          )}
        </button>
      </form>
    </div>
  );
};

export default MobileSearch;
