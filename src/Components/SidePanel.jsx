import React from 'react';

import TopicBox from './SidePanel/TopicBox';
import NewPostRules from './SidePanel/NewPostRules';
import TopArticles from './SidePanel/TopArticles';

const SidePanel = ({ topicData, page }) => {
  const topicSlug = topicData ? topicData.slug : null;

  return (
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
  );
};

export default SidePanel;
