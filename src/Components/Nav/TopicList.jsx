import React, { Component } from 'react';
import { getTopicList, getTopic } from '../../Utils/api';
import { Link } from '@reach/router';

class TopicList extends Component {
  state = {
    topicList: [],
    isLoading: true,
  };

  componentDidMount = async () => {
    const { topicSearch } = this.props;

    let topics;

    if (topicSearch) {
      topics = await getTopic(topicSearch);
    } else {
      topics = await getTopicList();
    }

    this.setState({ topicList: topics.topics, isLoading: false });
  };

  render() {
    const { isLoading } = this.state;

    const { topicList } = this.state;

    console.log(topicList);

    if (isLoading) {
      return null;
    } else {
      return (
        <div className="nav__topiclist">
          {topicList.map((topic) => {
            return (
              <Link
                to={`/articles/${topic.slug}`}
                key={topic.slug}
                className="nav__topic"
                state={{ topic }}
              >
                {topic.slug}
              </Link>
            );
          })}
        </div>
      );
    }
  }
}

export default TopicList;
