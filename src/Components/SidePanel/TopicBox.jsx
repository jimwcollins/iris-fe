import React, { Component } from 'react';

import { getTopic } from '../../Utils/api';
import { formatTitle } from '../../Utils/utils';

class TopicBox extends Component {
  state = {
    hasTopic: false,
    topic: {},
  };

  componentDidMount = async () => {
    const { topicSlug } = this.props;

    if (topicSlug) {
      const { topics } = await getTopic(topicSlug);
      this.setState({ hasTopic: true, topic: topics[0] });
    }
  };

  componentDidUpdate = async (prevProps) => {
    const { topicSlug } = this.props;

    if (topicSlug && topicSlug !== prevProps.topicSlug) {
      const { topics } = await getTopic(topicSlug);
      this.setState({ hasTopic: true, topic: topics[0] });
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
