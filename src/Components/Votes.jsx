import React, { Component } from 'react';
import { updateArticleVotes } from '../api';

class Votes extends Component {
  state = {
    articleId: this.props.articleId,
    votes: this.props.votes,
    hasVoted: false,
    voteChange: 0
  };

  handleClick = async (inc) => {
    const currentVotes = this.state.votes;

    try {
      updateArticleVotes(this.state.articleId, inc);
    } catch (err) {
      alert('Error updating vote');

      this.setState((currentState) => {
        return { votes: currentVotes };
      });
    }

    this.setState((currentState) => {
      return { votes: currentState.votes + inc };
    });
  };

  render() {
    const { votes } = this.state;

    return (
      <div className="vote__block">
        <button className="vote__btn" onClick={() => this.handleClick(-1)}>
          ▼
        </button>
        <p className="vote__text">{votes}</p>
        <button className="vote__btn" onClick={() => this.handleClick(1)}>
          ▲
        </button>
      </div>
    );
  }
}

export default Votes;
