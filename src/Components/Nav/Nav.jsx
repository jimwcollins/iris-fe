import React, { Component } from 'react';
import TopicList from './TopicList';
import User from '../User/User';
import TopicNav from './TopicNav';

class Nav extends Component {
  state = {
    showTopics: false,
    topicInput: '',
  };

  hideTopics = () => {
    this.setState({ showTopics: false, topicInput: '' });
  };

  topicSearch = (topicInput) => {
    this.setState({ showTopics: true, topicInput });
  };

  render() {
    const { showTopics, topicInput } = this.state;

    return (
      <nav className="nav grid">
        <div className="nav__bar grid">
          <div className="nav__bar__controls">
            <div className="topics__container">
              <TopicNav
                hideTopics={this.hideTopics}
                topicSearch={this.topicSearch}
              />
            </div>
            <User />
          </div>
        </div>

        {showTopics ? <TopicList topicSearch={topicInput} /> : null}
      </nav>
    );
  }
}

export default Nav;
