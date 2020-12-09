import React from 'react';
import TopicBox from './SidePanel/TopicBox';

const SidePanel = (props) => {
  const { topic } = props;

  return (
    <div className="sidepanel">
      {topic ? <TopicBox topic={topic} /> : 'Side Panel'}
    </div>
  );
};

export default SidePanel;
