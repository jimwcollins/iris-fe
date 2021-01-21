import React, { Component } from 'react';
import { getTopicList, getTopic } from '../../Utils/api';
import { navigate } from '@reach/router';

class TopicList extends Component {
  state = {
    topicList: [],
    isLoading: true,
  };

  componentDidMount = async () => {
    const { topicSearch } = this.props;

    let topicList;

    if (topicSearch) {
      const { topics } = await getTopic(topicSearch);
      topicList = topics;
    } else {
      const { topics } = await getTopicList();
      topicList = topics;
    }

    this.setState({ topicList, isLoading: false });
  };

  handleTopicNav = (topic) => {
    const { resetTopics } = this.props;
    resetTopics();
    navigate(`/articles/${topic.slug}`, { state: { topic } });
  };

  render() {
    const { isLoading } = this.state;
    const { topicList } = this.state;

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
                onClick={() => this.handleTopicNav(topic)}
              >
                {topic.slug}
              </button>
            );
          })}
        </div>
      );
    }
  }
}

export default TopicList;
