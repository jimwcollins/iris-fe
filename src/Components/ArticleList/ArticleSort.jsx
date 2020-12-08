import React, { Component } from 'react';

class ArticleSort extends Component {
  state = {
    sortBy: 'date',
    order: 'desc'
  };

  handleChange = (event) => {
    const { loadArticleList, topic } = this.props;

    this.setState({ [event.target.name]: event.target.value }, () =>
      loadArticleList(topic, this.state.sortBy, this.state.order)
    );
  };

  render() {
    return (
      <div className="articles-sort">
        <p className="articles__count">
          Now showing 10 of {this.props.articleCount} articles
        </p>

        <div className="articles-sort__controls">
          <p className="articles-sort__label">Sort by: </p>
          <select
            name="sortBy"
            onChange={this.handleChange}
            value={this.state.sortBy}
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>

          <select
            name="order"
            onChange={this.handleChange}
            value={this.state.order}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>
    );
  }
}

export default ArticleSort;
