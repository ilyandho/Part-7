import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/users/';

let token = null;

const setToken = (newToken) => {
  return (token = `Bearer ${newToken}`);
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
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

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}${id}`;

  const response = await axios.delete(url, config);
  return response;
};

export default { getAll, create, setToken, update, remove };
