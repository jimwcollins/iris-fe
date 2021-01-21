import axios from 'axios';

const irisApi = axios.create({
  // baseURL: 'https://iris-be.herokuapp.com/api',
  baseURL: 'http://localhost:9090/api',
});

export const getUser = async (username) => {
  const { data: user } = await irisApi.get(`/users/${username}`);
  return user;
};

export const getTopicList = async () => {
  const { data: topics } = await irisApi.get('/topics');
  return topics;
};

export const getTopic = async (topicSlug) => {
  const { data: topic } = await irisApi.get(`/topics/${topicSlug}`);
  return topic;
};

export const getArticleList = async (topic, sortBy, order, limit) => {
  const { data: articles } = await irisApi.get('/articles', {
    params: {
      topic,
      sort_by: sortBy,
      order,
    },
  });

  return articles;
};

export const getArticle = async (articleId) => {
  const {
    data: { article },
  } = await irisApi.get(`/articles/${articleId}`);

  return article;
};

export const postArticle = async (author, topic, title, body) => {
  const {
    data: { article },
  } = await irisApi.post('/articles/', {
    title,
    body,
    topic,
    author,
  });

  return article;
};

export const delArticle = async (articleId) => {
  await irisApi.delete(`/articles/${articleId}`);
};

export const getCommentList = async (articleId) => {
  const {
    data: { comments },
  } = await irisApi.get(`/articles/${articleId}/comments`);

  return comments;
};

export const postNewComment = async (user, articleId, commentText) => {
  const {
    data: { comment },
  } = await irisApi.post(`/articles/${articleId}/comments`, {
    username: user,
    body: commentText,
  });

  return comment;
};

export const deleteComment = (commentId) => {
  irisApi.delete(`/comments/${commentId}`);
};

export const updateArticleVotes = async (articleId, voteInc) => {
  const {
    data: { article },
  } = await irisApi.patch(`/articles/${articleId}`, {
    inc_votes: voteInc,
  });

  return article;
};

export const updateCommentVotes = async (commentId, voteInc) => {
  const {
    data: { comment },
  } = await irisApi.patch(`/comments/${commentId}`, {
    inc_votes: voteInc,
  });

  return comment;
};
