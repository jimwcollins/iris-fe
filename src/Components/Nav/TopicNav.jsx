import React, { useState } from 'react';
import icons from '../../images/iris-icons.svg';

const TopicNav = (props) => {
  const [btnActive, setBtnActive] = useState(false);
  const [formActive, setFormActive] = useState(false);
  const [topicInput, setTopicInput] = useState('');

  const { displayTopics, topicSearch } = props;

  const handleTopicBtn = () => {
    if (btnActive) {
      setBtnActive(false);
      setFormActive(false);
      displayTopics();
    } else {
      setBtnActive(true);
      setFormActive(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    topicSearch(topicInput);
    setTopicInput('');
    setFormActive(false);
  };

  return (
    <div className={formActive ? 'navButton navButton--active' : 'navButton'}>
      <button
        className={
          btnActive
            ? 'navButton__btn navButton__btn--topic navButton__btn--active'
            : 'navButton__btn navButton__btn--topic'
        }
        onClick={handleTopicBtn.bind(this)}
      >
        Topics
      </button>

      <form
        className={formActive ? 'nav__form nav__form--active' : 'nav__form'}
        onSubmit={handleSubmit}
      >
        <input
          className="nav__form__input"
          type="text"
          name="searchTopics"
          value={topicInput}
          placeholder="Search for topics or show all"
          onChange={(event) => setTopicInput(event.target.value)}
          autoComplete="off"
        />
        <button
          className={
            formActive
              ? 'nav__form__submit nav__form__submit--active'
              : 'nav__form__submit'
          }
          type="submit"
        >
          <svg>
            <use href={icons + '#icon-magnifying-glass'}></use>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default TopicNav;
