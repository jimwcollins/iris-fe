import { Link } from '@reach/router';
import React, { Component } from 'react';
import TopicList from './TopicList';
import User from '../User/User';
import { UserContext } from '../../Contexts/UserContext';
import TopicNav from './TopicNav';

class Nav extends Component {
  state = {
    showTopics: false
  };

  handleTopicBtn = () => {
    this.setState((currState) => {
      return { showTopics: !currState.showTopics };
    });
  };

  render() {
    const { showTopics } = this.state;
    const { user } = this.context;

    return (
      <nav className="nav grid">
        <div className="nav__bar grid">
          <div className="nav__bar__controls">
            <div className="topics__container">
              {user && (
                <Link to="/article/new" className="title-link">
                  <button className="btn__post btn__space-right">
                    <span className="btn__post__icon">&#9998;</span>
                  </button>
                </Link>
              )}
              <TopicNav
                showTopics={this.state.showTopics}
                onClick={this.handleTopicBtn}
              >
                Topics
              </TopicNav>
            </div>
            <User />
          </div>
        </div>

        {showTopics ? <TopicList /> : null}
      </nav>
    );
  }
}

Nav.contextType = UserContext;

export default Nav;
