import { useState, useEffect } from 'react';
import axios from 'axios';

const getId = () => Math.floor(Math.random() * 10000);
export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onReset = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    onReset,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  // ...
  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      console.log('get All', response.data);
      setResources(response.data);
    });
  }, []);

  const create = async (resource) => {
    const id = getId();
    resource.id = id;
    const response = await axios.post(baseUrl, resource);
    console.log('create', response.data);
    setResources([...resources, response.data]);
  };

  const service = {
    create,
  };

  return [resources, service];
};
