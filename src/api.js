import axios from 'axios';

const irisApi = axios.create({
  baseURL: 'http://localhost:9090/api'
});

export const getTopics = async () => {
  const { data: topics } = await irisApi.get('/topics');

  return topics;
};

export const getArticleList = async (topic) => {
  const { data: articles } = await irisApi.get('/articles', {
    params: {
      topic
    }
  });

  return articles;
};

export const getArticle = async (articleId) => {
  const {
    data: { article }
  } = await irisApi.get(`/articles/${articleId}`);

  return article;
};
