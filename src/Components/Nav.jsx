import React, { Component } from 'react';
import TopicList from './Nav/TopicList';
import User from './User';

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

    return (
      <nav className="nav grid">
        <div className="nav__bar grid">
          <div className="nav__bar__controls">
            <div className="nav__bar__topic">
              <button className="btn" onClick={this.showTopics}>
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

export default Nav;
