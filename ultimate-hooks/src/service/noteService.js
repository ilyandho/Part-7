import axios from 'axios';

const baseUrl = ' http://localhost:3005';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response);
  return response.data;
};

export { getAll };
