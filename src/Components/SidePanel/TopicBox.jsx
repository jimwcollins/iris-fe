import React, { Component } from 'react';
import { getTopic } from '../../api';

class TopicBox extends Component {
  state = {
    topic: {},
    isLoading: true,
    hasError: false,
    errMsg: ''
  };

  componentDidMount = async () => {
    try {
      const { topicSlug } = this.props;
      const { topic } = await getTopic(topicSlug);
      this.setState({ topic, isLoading: false });
    } catch (err) {
      const {
        response: { status, statusText }
      } = err;

      this.setState({
        isLoading: false,
        hasError: true,
        errMsg: `${status}: ${statusText}`
      });
    }
  };

  // Capitalise the title
  formatTopic = (topicSlug) => {
    return topicSlug.charAt(0).toUpperCase() + topicSlug.slice(1);
  };

  render() {
    const { slug, description } = this.state.topic;
    // const topic = this.formatTopic(slug);

    return (
      <div>
        <p>{slug}</p>
        <p>{description}</p>
      </div>
    );
  }
}

export default TopicBox;
