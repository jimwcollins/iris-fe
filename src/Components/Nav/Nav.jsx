import { Link } from '@reach/router';
import React, { Component } from 'react';
import TopicList from './TopicList';
import User from '../User';
import { UserContext } from '../../Contexts/UserContext';

class Nav extends Component {
  state = {
    showTopics: false
  };

  showTopics = () => {
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
            <div className="nav__bar__topic">
              {user && (
                <Link to="/article/new" className="title-link">
                  <button className="btn__post btn__space-right">
                    <span className="btn__post__icon">&#9998;</span>
                  </button>
                </Link>
              )}
              <button
                className="btn btn__space-right"
                onClick={this.showTopics}
              >
                Topics
              </button>
              <form>
                <input
                  className="nav__search"
                  type="text"
                  name="searchTopics"
                  placeholder="Search topics"
                  autoComplete="off"
                />
              </form>
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
