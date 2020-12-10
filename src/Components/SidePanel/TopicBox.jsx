import React, { Component } from 'react';
import { getTopic } from '../../api';

class TopicBox extends Component {
  state = {
    hasTopic: false,
    topic: {},
    isLoading: true,
    hasError: false,
    errMsg: ''
  };

  componentDidMount = () => {
    const { topicSlug } = this.props;
    this.fetchTopicInfo(topicSlug);
  };

  componentDidUpdate = (prevProps) => {
    const { topicSlug } = this.props;
    if (topicSlug !== prevProps.topicSlug) {
      this.fetchTopicInfo(topicSlug);
    }
  };

  fetchTopicInfo = async (topicSlug) => {
    if (topicSlug) {
      try {
        const { topic } = await getTopic(topicSlug);
        this.setState({ hasTopic: true, topic, isLoading: false });
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
    }
  };

  // Capitalise the title
  formatTopic = (topicSlug) => {
    return topicSlug.charAt(0).toUpperCase() + topicSlug.slice(1);
  };

  render() {
    const { slug, description } = this.state.topic;
    let topic, subhead;

    if (slug) topic = this.formatTopic(slug);
    else topic = 'Hi there!';

    if (slug) subhead = description;
    else subhead = 'Pick a topic or dive right in...';

    return (
      <div className="topicbox">
        <div className="box__header">
          <p className="box__header__text">{topic}</p>
        </div>
        <p className="box__desc">{subhead}</p>
      </div>
    );
  }
}

export default TopicBox;
