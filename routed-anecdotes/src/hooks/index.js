import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');
  const onChange = (e) => setValue(e.target.value);
  const onReset = (e) => e.target.reset();
  if (type === 'reset') {
    return {
      type: 'reset',
      value: 'reset',
      onClick: onReset,
    };
  }
  return {
    type,
    value,
    onChange,
  };
};
