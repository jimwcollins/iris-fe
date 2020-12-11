import React, { Component } from 'react';
import SidePanel from './SidePanel';

class NewArticle extends Component {
  state = {
    user: null,
    topic: '',
    title: '',
    body: ''
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { user, topic, title, body } = this.state;
    this.setState({ comment: '' });

    // postArticle(user, topic, title, body);
  };

  render() {
    return (
      <main>
        <h2 className="articles__header">What's on your mind?</h2>
        <div className="articles">
          <form className="new-article" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="topic"
              placeholder="Topic"
              required
              className="new-article__input"
              onChange={this.handleChange}
            ></input>
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              className="new-article__input"
              onChange={this.handleChange}
            ></input>

            <textarea
              name="body"
              value={this.state.comment}
              placeholder="Impart your wisdom here"
              required
              className="new-article__input__body"
              onChange={this.handleChange}
            ></textarea>
            <input type="submit" className="new-article__submit"></input>
          </form>
        </div>

        {/* <SidePanel topic={topic} /> */}
      </main>
    );
  }
}

export default NewArticle;

/*
    title: 'Kindles: tech magic or work of the dark one?',
    body:
      'Book-lovers of the world unite to condemn this newfangled devilry. Tech-fans strike back.',
    topic: 'paper',
    author: 'rogersop',
  })
  .expect(201)
  .then(({ body }) => {
    expect(body.article).toEqual({
      article_id: 13,
      title: 'Kindles: tech magic or work of the dark one?',
      body:
        'Book-lovers of the world unite to condemn this newfangled devilry. Tech-fans strike back.',
      votes: 0,
      topic: 'paper',
      author: 'rogersop',
      created_at: expect.any(String),

*/
