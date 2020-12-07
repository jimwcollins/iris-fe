import React, { Component } from 'react';
import { fetchTopics } from '../../api';
import { Link } from '@reach/router';

class TopicList extends Component {
  state = {
    topics: [],
    isLoading: true
  };

  componentDidMount = async () => {
    const { topics } = await fetchTopics();

    this.setState({ topics, isLoading: false });
  };

  render() {
    const topics = this.state.topics;

    return (
      <div>
        {topics.map((topic) => {
          return (
            <Link to={`/articles/${topic.slug}`}>
              <button key={topic.slug}>{topic.slug}</button>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default TopicList;
