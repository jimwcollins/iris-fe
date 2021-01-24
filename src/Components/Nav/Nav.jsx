import React, { useState, useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { Link } from '@reach/router';

import TopicList from './TopicList';
import User from '../User/User';
import TopicSearch from './TopicSearch';
import MobileSearch from './MobileSearch';
import Breakpoint from '../../Responsive/breakpoint';
import icons from '../../images/iris-icons.svg';

const Nav = () => {
  const [showTopics, setShowTopics] = useState(false);
  const [topicInput, setTopicInput] = useState('');
  const [clearTopicBtn, setClearTopicBtn] = useState(false);
  const [showMobSearch, setShowMobSearch] = useState(false);

  const { user } = useContext(UserContext);

  const topicSearch = (topicInput) => {
    setShowTopics(true);
    setTopicInput(topicInput);
  };

  const resetTopics = () => {
    setShowTopics(false);
    setTopicInput('');
    setClearTopicBtn(true);
    setShowMobSearch(false);
  };

  const resetBtn = () => {
    setClearTopicBtn(false);
  };

  const handleMobButton = () => {
    setShowMobSearch(!showMobSearch);

    if (showTopics) setShowTopics(false);
  };

  return (
    <>
      <Breakpoint screen="desktop">
        <nav className="nav grid">
          <div className="nav__bar grid">
            <div className="nav__bar__controls">
              <div className="topics__container">
                <TopicSearch
                  clearTopicBtn={clearTopicBtn}
                  resetTopics={resetTopics}
                  topicSearch={topicSearch}
                  resetBtn={resetBtn}
                />
              </div>
              <User />
            </div>
          </div>

          {showTopics ? (
            <TopicList topicInput={topicInput} resetTopics={resetTopics} />
          ) : null}
        </nav>
      </Breakpoint>

      <Breakpoint screen="tabPhone">
        <nav className="navMob grid">
          <div className="nav__bar grid">
            <div className="nav__bar__controls">
              <div className="nav__bar__left">
                {user && (
                  <Link to="/article/new" className="sidepanel__link">
                    <button className="navButton navButton--post">
                      <svg>
                        <use href={icons + '#icon-pencil'}></use>
                      </svg>
                    </button>
                  </Link>
                )}

                <button
                  className={
                    showMobSearch ? 'navButton navButton--active' : 'navButton'
                  }
                  onClick={handleMobButton}
                >
                  TOPICS
                </button>
              </div>
              <User />
            </div>
          </div>

          {showMobSearch && <MobileSearch topicSearch={topicSearch} />}

          {showTopics ? (
            <TopicList topicInput={topicInput} resetTopics={resetTopics} />
          ) : null}
        </nav>
      </Breakpoint>
    </>
  );
};

export default Nav;
