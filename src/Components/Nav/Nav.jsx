import React, { Component } from 'react';
import TopicList from './TopicList';
import User from '../User/User';
import TopicNav from './TopicNav';

class Nav extends Component {
  state = {
    showTopics: false,
    topicInput: '',
  };

  displayTopics = () => {
    this.setState((currState) => {
      return { showTopics: !currState.showTopics };
    });
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
                displayTopics={this.displayTopics}
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
