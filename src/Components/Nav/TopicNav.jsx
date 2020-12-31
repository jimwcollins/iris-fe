import React, { useState } from 'react';

const TopicNav = (props) => {
  const [active, setActive] = useState(false);
  const [formActive, setFormActive] = useState(false);

  const { showTopics } = props;

  const handleHover = (isActive) => {
    if (isActive) {
      setActive(true);
    } else if (!formActive) {
      setActive(false);
    }
  };

  const handleForm = (hasFocus) => {
    if (hasFocus) {
      setFormActive(true);
    } else {
      setFormActive(false);
      setActive(false);
    }
  };

  return (
    <div
      className={active ? 'navButton navButton--active' : 'navButton'}
      onMouseEnter={handleHover.bind(this, true)}
      onMouseLeave={handleHover.bind(this, false)}
    >
      <button
        className={
          active || showTopics
            ? 'navButton__btn navButton__btn--active'
            : 'navButton__btn'
        }
        onClick={props.onClick}
      >
        {props.children}
      </button>
      {active && (
        <form
          className={active ? 'nav__form nav__form--active' : 'nav__form'}
          onFocus={handleForm.bind(this, true)}
          onBlur={handleForm.bind(this, false)}
        >
          <input
            className="nav__form__input"
            type="text"
            name="searchTopics"
            placeholder={
              showTopics
                ? 'Search for topics or click to hide all'
                : 'Search for topics or click to show all'
            }
            autoComplete="off"
          />
        </form>
      )}
    </div>
  );
};

export default TopicNav;
