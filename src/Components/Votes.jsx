import React, { Component } from 'react';
import { updateArticleVotes, updateCommentVotes } from '../Utils/api';
import icons from '../images/iris-icons.svg';

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

    let upVoteClass = 'vote__btn vote__btn__up';
    let downVoteClass = 'vote__btn vote__btn__down';

    if (voteStatus === 1) {
      upVoteClass += ' vote__btn__up--active';
    } else if (voteStatus === -1) {
      downVoteClass += ' vote__btn__down--active';
    }

    return (
      <div className="vote__block">
        <svg className={upVoteClass} onClick={() => this.handleClick(1)}>
          <use href={icons + '#icon-thumbs-up'}></use>
        </svg>
        <p className="vote__txt">{votes}</p>
        <svg className={downVoteClass} onClick={() => this.handleClick(-1)}>
          <use href={icons + '#icon-thumbs-down'}></use>
        </svg>
      </div>
    );
  }
}

export default Votes;
