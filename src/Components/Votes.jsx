import React, { Component } from 'react';

class Votes extends Component {
  state = {
    votes: this.props.votes,
    hasVoted: false,
    voteChange: 0
  };

  render() {
    const { votes } = this.state;

    return (
      <div className="vote__block">
        <button className="vote__btn">▼</button>
        <p className="vote__text">{votes}</p>
        <button className="vote__btn">▲</button>
      </div>
    );
  }
}

export default Votes;
