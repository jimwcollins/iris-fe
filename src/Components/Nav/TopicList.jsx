import React, { Component } from 'react';
import { getTopics } from '../../api';
import { Link } from '@reach/router';

class TopicList extends Component {
  state = {
    topics: [],
    isLoading: true
  };

  componentDidMount = async () => {
    const { topics } = await getTopics();

    this.setState({ topics, isLoading: false });
  };

  render() {
    const topics = this.state.topics;

    return (
      <div className="nav__topiclist">
        {topics.map((topic) => {
          return (
            <Link
              to={`/articles/${topic.slug}`}
              key={topic.slug}
              className="nav__topic"
            >
              {topic.slug}
            </Link>
          );
        })}
      </div>
    );
  }
}

export default TopicList;
