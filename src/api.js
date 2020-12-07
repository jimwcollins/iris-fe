import axios from 'axios';

const irisApi = axios.create({
  baseURL: 'http://localhost:9090/api'
});

export const fetchArticles = async (topic) => {
  const { data: articles } = await irisApi.get('/articles', {
    params: {
      topic
    }
  });

  return articles;
};
