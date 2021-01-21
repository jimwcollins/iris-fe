import React, { Component } from 'react';

import { formatTitle } from '../../Utils/utils';

class TopicBox extends Component {
  state = {
    hasTopic: false,
    topic: {},
  };

  componentDidMount = () => {
    const { topicData } = this.props;

    if (topicData) this.setState({ hasTopic: true, topic: topicData });
  };

  componentDidUpdate = (prevProps) => {
    const { topicData } = this.props;

    if (topicData && topicData.slug !== prevProps.topicData.slug) {
      this.setState({ hasTopic: true, topic: topicData });
    }
  };

  render() {
    const { hasTopic } = this.state;

    let topic = 'Hi there!';
    let subhead = 'Pick a topic or dive right in';

    if (hasTopic) {
      const { slug, description } = this.state.topic;
      topic = formatTitle(slug);
      subhead = description;
    }

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
