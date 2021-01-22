import React, { Component } from 'react';

import { UserContext } from '../Contexts/UserContext';
import { postArticle } from '../Utils/api';
import { formatTitle } from '../Utils/utils';

import SidePanel from './SidePanel';

class NewArticle extends Component {
  state = {
    user: this.context.user,
    topic: '',
    title: '',
    body: '',
    isPosted: false,
    newArticleId: null,
    hasError: false,
    errMsg: '',
  };

  componentDidMount = () => {
    const { topic } = this.props;

    if (topic) {
      this.setState({ topic: formatTitle(topic) });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      user: { username },
      topic,
      title,
      body,
    } = this.state;

    const { showNewModal } = this.props;

    try {
      const newArticle = await postArticle(username, topic, title, body);
      this.setState(
        {
          user: this.context.user,
          topic: '',
          title: '',
          body: '',
          isPosted: true,
          newArticleId: newArticle.article_id,
          hasError: false,
          errMsg: '',
        },
        () => {
          const { newArticleId } = this.state;
          showNewModal(
            true,
            'Article Created',
            'Take a look!',
            `/article/${newArticleId}`
          );
        }
      );
    } catch (err) {
      const {
        response: { status, statusText },
      } = err;

      this.setState({
        isLoading: false,
        hasError: true,
        errMsg: `${status}: ${statusText}`,
      });
    }
  };

  render() {
    const {
      user: { name },
      isPosted,
    } = this.state;

    const { topic } = this.props;

    return (
      <>
        {!isPosted ? (
          <>
            <h2 className="articles__header">What's on your mind, {name}?</h2>
            <div className="articles">
              <form className="new-article" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="topic"
                  placeholder="Topic"
                  value={this.state.topic}
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
                  className="new-article__textArea"
                  onChange={this.handleChange}
                ></textarea>
                <input
                  type="submit"
                  value="post"
                  className="mainButton new-article__submitBtn"
                ></input>
              </form>
            </div>
            <SidePanel topic={topic} page="newArticle" />
          </>
        ) : null}
      </>
    );
  }
}

NewArticle.contextType = UserContext;

export default NewArticle;
