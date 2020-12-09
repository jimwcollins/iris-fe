import React from 'react';
import TopicBox from './SidePanel/TopicBox';

const SidePanel = (props) => {
  const { topicSlug } = props;

  return (
    <div className="sidepanel">
      {topicSlug ? <TopicBox topicSlug={topicSlug} /> : 'Side Panel'}
    </div>
  );
};

export default SidePanel;
