import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useField } from '../hooks/index';

const CreateNew = ({ addNew, setNotification }) => {
  const content = useField('');
  const author = useField('');
  const info = useField('');
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    setNotification(content.value);

    history.push('/');
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content.value}
            onChange={content.onChange}
            type={content.type}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author.value}
            onChange={author.onChange}
            type={author.value}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info.value}
            onChange={info.onChange}
            type={info.type}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
