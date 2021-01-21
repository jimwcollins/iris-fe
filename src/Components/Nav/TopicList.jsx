import React, { Component } from 'react';
import { getTopicList } from '../../Utils/api';
import { Link } from '@reach/router';

class TopicList extends Component {
  state = {
    topics: [],
    isLoading: true,
  };

  componentDidMount = async () => {
    const { topics } = await getTopicList();

    this.setState({ topics, isLoading: false });
  };

  render() {
    const { isLoading } = this.state;

    const topics = this.state.topics;

    if (isLoading) {
      return null;
    } else {
      return (
        <div className="nav__topiclist">
          {topics.map((topic) => {
            return (
              <Link
                to={`/articles/${topic.slug}`}
                key={topic.slug}
                className="nav__topic"
                state={{ topic }}
              >
                {topic.slug}
              </Link>
            );
          })}
        </div>
      );
    }
  }
}

export default TopicList;
