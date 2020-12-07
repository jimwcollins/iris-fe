import React from 'react';
import TopicList from './Nav/TopicList';

const Nav = () => {
  return (
    <nav className="nav">
      <p>Topics</p>
      <TopicList />
    </nav>
  );
};

export default Nav;
