import React, { Component } from 'react';
import { updateArticleVotes, updateCommentVotes } from '../api';

class Votes extends Component {
  state = {
    type: this.props.type,
    id: this.props.id,
    votes: this.props.votes,
    voteStatus: 0
  };

  handleClick = async (voteBtn) => {
    const currentVotes = this.state.votes;
    const { type, id, voteStatus } = this.state;

    let inc, newVoteStatus;

    // Handle repeated clicks
    if (voteStatus === 1 && voteBtn === 1) {
      // Already voted up so reverse
      inc = -1;
      newVoteStatus = 0;
    } else if (voteStatus === 1 && voteBtn === -1) {
      // Already voted up so reverse and case downvote
      inc = -2;
      newVoteStatus = -1;
    } else if (voteStatus === -1 && voteBtn === 1) {
      // Already voted down so reverse and case upvote
      inc = 2;
      newVoteStatus = 1;
    } else if (voteStatus === -1 && voteBtn === -1) {
      // Already voted down so reverse
      inc = 1;
      newVoteStatus = 0;
    } else {
      // No current vote so handle normally
      inc = voteBtn;
      newVoteStatus = voteBtn;
    }

    // Set state first, optimistic rendering
    this.setState((currentState) => {
      return { votes: currentState.votes + inc, voteStatus: newVoteStatus };
    });

    try {
      if (type === 'article') updateArticleVotes(id, inc);
      else if (type === 'comment') updateCommentVotes(id, inc);
    } catch (err) {
      alert('Error updating vote');

      this.setState({
        votes: currentVotes,
        voteStatus: 0
      });
    }
  };

  render() {
    const { votes, voteStatus } = this.state;

    return (
      <div className="vote__block">
        <button
          className={
            voteStatus === -1 ? 'vote__btn vote__btn__down' : 'vote__btn'
          }
          onClick={() => this.handleClick(-1)}
        >
          ▼
        </button>
        <p className="vote__text">{votes}</p>
        <button
          className={voteStatus === 1 ? 'vote__btn vote__btn__up' : 'vote__btn'}
          onClick={() => this.handleClick(1)}
        >
          ▲
        </button>
      </div>
    );
  }
}

export default Votes;
