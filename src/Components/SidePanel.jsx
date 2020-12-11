import React, { Component } from 'react';
import TopicBox from './SidePanel/TopicBox';
import TopArticles from './SidePanel/TopArticles';

class SidePanel extends Component {
  state = {
    topic: ''
  };

  componentDidMount = () => {
    this.setState({ topic: this.props.topic });
  };

  componentDidUpdate = (prevProps) => {
    const { topic } = this.props;
    if (topic !== prevProps.topic) {
      this.setState({ topic: this.props.topic });
    }
  };

  render() {
    const { topic } = this.state;

    return (
      <div className="sidepanel__box">
        <TopicBox topicSlug={topic} />
        <TopArticles topicSlug={topic} />
      </div>
    );
  }
}

export default SidePanel;
