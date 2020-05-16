import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs/';

let token = null;

const setToken = (newToken) => {
  return (token = `Bearer ${newToken}`);
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}${id}`;
  const response = await axios.put(url, newObject, config);
  return response.data;
};

const updateComments = async (id, comment) => {
  const url = `${baseUrl}${id}/comments`;
  const response = await axios.put(url, { text: comment });
  return response.data;
};

const updateLikes = async (id) => {
  const url = `${baseUrl}${id}/likes`;
  const response = await axios.put(url);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}${id}`;

  const response = await axios.delete(url, config);
  return response;
};

export default {
  getAll,
  create,
  setToken,
  update,
  remove,
  updateComments,
  updateLikes,
};
