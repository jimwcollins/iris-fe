import React, { useState } from 'react';
import TopicList from './TopicList';
import User from '../User/User';
import TopicNav from './TopicNav';
import MobileSearch from './MobileSearch';
import Breakpoint from '../../Responsive/breakpoint';

const Nav = () => {
  const [showTopics, setShowTopics] = useState(false);
  const [topicInput, setTopicInput] = useState('');
  const [clearTopicBtn, setClearTopicBtn] = useState(false);
  const [showMobSearch, setShowMobSearch] = useState(false);

  const topicSearch = (topicInput) => {
    console.log('Searching for:', topicInput);
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
                <TopicNav
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
              <button
                className={
                  showMobSearch ? 'navButton navButton--active' : 'navButton'
                }
                onClick={handleMobButton}
              >
                TOPICS
              </button>
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
