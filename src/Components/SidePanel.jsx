import React, { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';
import { Link } from '@reach/router';

import TopicBox from './SidePanel/TopicBox';
import NewPostRules from './SidePanel/NewPostRules';
import TopArticles from './SidePanel/TopArticles';

const SidePanel = ({ topicData, page }) => {
  const { user } = useContext(UserContext);
  const topicSlug = topicData ? topicData.slug : null;

  return (
    <div>
      <div className="sidepanel__box">
        {page === 'newArticle' ? (
          <NewPostRules screen="desktop" />
        ) : (
          <>
            <TopicBox topicData={topicData} />
            <TopArticles topicSlug={topicSlug} />
          </>
        )}
      </div>
      {user && page !== 'newArticle' && page !== 'article' && (
        <Link
          to={topicSlug ? `/article/new/${topicSlug}` : '/article/new'}
          className="sidepanel__link"
        >
          <button className="mainButton">
            <span className="mainButton__text">Post new article</span>
          </button>
        </Link>
      )}
      {page !== 'articleList' && (
        <Link
          to={topicSlug ? `/articles/${topicSlug}` : '/'}
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
