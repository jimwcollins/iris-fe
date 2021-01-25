import React from 'react';

import TopicBox from './SidePanel/TopicBox';
import NewPostRules from './SidePanel/NewPostRules';
import TopArticles from './SidePanel/TopArticles';

const SidePanel = ({ topicSlug, page }) => {
  return (
    <div className="sidepanel__box">
      {page === 'newArticle' ? (
        <NewPostRules screen="desktop" />
      ) : (
        <>
          <TopicBox topicSlug={topicSlug} />
          <TopArticles topicSlug={topicSlug} />
        </>
      )}
    </div>
  );
};

export default SidePanel;
