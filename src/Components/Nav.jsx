import React, { Component } from 'react';
import TopicList from './Nav/TopicList';

class Nav extends Component {
  state = {
    showTopics: false
  };

  showTopics = () => {
    this.setState((currState) => {
      return { showTopics: !currState.showTopics };
    });
  };

  loginUser = () => {};

  render() {
    const { showTopics } = this.state;

    return (
      <nav className="nav grid">
        <div className="nav__bar grid">
          <div className="nav__bar__controls">
            <button className="btn" onClick={this.showTopics}>
              Topics
            </button>
            <form>
              <input
                className="nav__search"
                type="text"
                name="searchTopics"
                placeholder="Search topics"
              />
            </form>
            <button className="btn" onClick={this.loginUser}>
              Login
            </button>
          </div>
        </div>

        {showTopics ? <TopicList /> : null}
      </nav>
    );
  }
}

export default Nav;
