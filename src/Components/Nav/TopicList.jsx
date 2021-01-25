import React, { useEffect, useState } from 'react';
import { getTopicList, getTopic } from '../../Utils/api';
import { navigate } from '@reach/router';

const TopicList = ({ topicInput, resetTopics }) => {
  const [topicList, setTopicList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTopics = async () => {
      let topicList;

      if (topicInput) {
        const { topics } = await getTopic(topicInput);
        topicList = topics;
      } else {
        const { topics } = await getTopicList();
        topicList = topics;
      }

      setTopicList(topicList);
      setIsLoading(false);
    };
    getTopics();
  }, [topicList, topicInput]);

  const handleTopicNav = (topicData) => {
    resetTopics();
    navigate(`/articles/${topicData.slug}`, { state: { topicData } });
  };

  if (isLoading) {
    return null;
  } else if (topicList.length === 0) {
    return (
      <div className="nav__topiclist">
        <p className="nav__topic">No topics found</p>
      </div>
    );
  } else {
    return (
      <div className="nav__topiclist">
        {topicList.map((topic) => {
          return (
            <button
              key={topic.slug}
              className="nav__topic nav__topic__link"
              type="button"
              onClick={() => handleTopicNav(topic)}
            >
              {topic.slug}
            </button>
          );
        })}
      </div>
    );
  }
};

export default TopicList;
