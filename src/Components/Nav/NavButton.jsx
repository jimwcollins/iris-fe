import React, { useState } from 'react';

const NavButton = (props) => {
  const [clicked, setClicked] = useState(false);

  const handleBtnClick = () => {
    if (clicked) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  };

  return (
    <div className={clicked ? 'navButton navButton--active' : 'navButton'}>
      <button
        className={
          clicked ? 'navButton__btn navButton__btn--active' : 'navButton__btn'
        }
        onClick={handleBtnClick}
      >
        {props.children}
      </button>
      {clicked && (
        <form className={clicked ? 'nav__form nav__form--active' : 'nav__form'}>
          <input
            className="nav__form__input"
            type="text"
            name="searchTopics"
            placeholder="Search for topics or show all"
            autoComplete="off"
          />
        </form>
      )}
    </div>
  );
};

export default NavButton;
