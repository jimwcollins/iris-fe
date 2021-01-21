import React, { Component } from 'react';
import TopicList from './TopicList';
import User from '../User/User';
import TopicNav from './TopicNav';

class Nav extends Component {
  state = {
    showTopics: false,
    topicInput: '',
    clearTopicBtn: false,
  };

  topicSearch = (topicInput) => {
    this.setState({ showTopics: true, topicInput });
  };

  resetTopics = () => {
    this.setState({ showTopics: false, topicInput: '', clearTopicBtn: true });
  };

  resetBtn = () => {
    this.setState({ clearTopicBtn: false });
  };

  render() {
    const { showTopics, topicInput, clearTopicBtn } = this.state;

    return (
      <nav className="nav grid">
        <div className="nav__bar grid">
          <div className="nav__bar__controls">
            <div className="topics__container">
              <TopicNav
                clearTopicBtn={clearTopicBtn}
                resetTopics={this.resetTopics}
                topicSearch={this.topicSearch}
                resetBtn={this.resetBtn}
              />
            </div>
            <User />
          </div>
        </div>

        {showTopics ? (
          <TopicList topicSearch={topicInput} resetTopics={this.resetTopics} />
        ) : null}
      </nav>
    );
  }
}

export default Nav;
