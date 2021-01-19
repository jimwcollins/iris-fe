import React, { useState, useContext } from 'react';
import { Link } from '@reach/router';

import TopicBox from './SidePanel/TopicBox';
import NewPostRules from './SidePanel/NewPostRules';
import TopArticles from './SidePanel/TopArticles';
import { UserContext } from '../Contexts/UserContext';

const SidePanel = ({ topic, newPost }) => {
  const { user } = useContext(UserContext);

  console.log('panel topic:', topic);

  return (
    <div>
      <div className="sidepanel__box">
        {newPost ? (
          <NewPostRules />
        ) : (
          <>
            <TopicBox topicSlug={topic} />
            <TopArticles topicSlug={topic} />
          </>
        )}
      </div>
      {user && !newPost && (
        <Link to={`/article/new/${topic}`}>
          <button className="newArticleBtn">
            <span className="newArticleBtn__text">Post new article</span>
          </button>
        </Link>
      )}
      {newPost && (
        <Link to={topic ? `/articles/${topic}` : '/'}>
          <button className="newArticleBtn">
            <span className="newArticleBtn__text">Back to articles</span>
          </button>
        </Link>
      )}
    </div>
  );
};

export default SidePanel;
