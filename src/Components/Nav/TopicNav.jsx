import React, { useState, useEffect } from 'react';
import icons from '../../images/iris-icons.svg';

const TopicNav = (props) => {
  const [btnActive, setBtnActive] = useState(false); // Handle display state of topic button
  const [formActive, setFormActive] = useState(false); // Handle display state of form and form elements
  const [topicInput, setTopicInput] = useState('');

  const { topicSearch, clearTopicBtn, resetTopics, resetBtn } = props;

  useEffect(() => {
    if (clearTopicBtn) {
      setBtnActive(false);
      resetBtn();
    }
  }, [clearTopicBtn, resetBtn]);

  const handleBtnClick = () => {
    if (btnActive) {
      setBtnActive(false);
      setFormActive(false);
      setTopicInput('');
      resetTopics();
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
        onClick={handleBtnClick}
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
        {topicInput ? (
          <button
            className={
              topicInput
                ? 'nav__form__submit nav__form__submit--active'
                : 'nav__form__submit'
            }
            type="submit"
          >
            <svg>
              <use href={icons + '#icon-magnifying-glass'}></use>
            </svg>
          </button>
        ) : (
          <input
            className={
              formActive
                ? 'nav__form__submitAll nav__form__submitAll--active'
                : 'nav__form__submitAll'
            }
            value="ALL"
            type="submit"
          />
        )}
      </form>
    </div>
  );
};

export default TopicNav;
