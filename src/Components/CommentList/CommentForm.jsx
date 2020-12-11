import React, { Component } from 'react';

class CommentForm extends Component {
  state = {
    comment: ''
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { addComment } = this.props;
    const { comment } = this.state;

    addComment(comment);
  };

  render() {
    const { user } = this.props;

    return (
      <div className="commentList__newComment">
        <p className="commentList__newComment__head">Comment as {user}</p>

        <form className="commentList__form" onSubmit={this.handleSubmit}>
          <textarea
            name="comment"
            id="comment"
            onChange={this.handleChange}
            value={this.state.comment}
            required
            className="commentList__form__input"
          ></textarea>
          <input type="submit"></input>
        </form>
      </div>
    );
  }
}

export default CommentForm;
