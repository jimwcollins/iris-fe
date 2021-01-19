import React, { useState, useContext } from 'react';
import { Link } from '@reach/router';

import TopicBox from './SidePanel/TopicBox';
import NewPostRules from './SidePanel/NewPostRules';
import TopArticles from './SidePanel/TopArticles';
import { UserContext } from '../Contexts/UserContext';

const SidePanel = ({ topic, page }) => {
  const { user } = useContext(UserContext);

  console.log('panel topic:', topic);

  return (
    <div>
      <div className="sidepanel__box">
        {page === 'newArticle' ? (
          <NewPostRules />
        ) : (
          <>
            <TopicBox topicSlug={topic} />
            <TopArticles topicSlug={topic} />
          </>
        )}
      </div>
      {user && page !== 'newArticle' && page !== 'article' && (
        <Link
          to={topic ? `/article/new/${topic}` : '/article/new'}
          className="sidepanel__link"
        >
          <button className="mainButton">
            <span className="mainButton__text">Post new article</span>
          </button>
        </Link>
      )}
      {page !== 'articleList' && (
        <Link
          to={topic ? `/articles/${topic}` : '/'}
          className="sidepanel__link"
        >
          <button className="mainButton">
            <span className="mainButton__text">Back to articles</span>
          </button>
        </Link>
      )}
    </div>
  );
};

export default SidePanel;
