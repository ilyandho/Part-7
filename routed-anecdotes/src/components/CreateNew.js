import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useField } from '../hooks/index';

const CreateNew = ({ addNew, handleNotification }) => {
  //   const [content, setContent] = useState('');
  const content = useField('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      content: content.value,
      author,
      info,
      votes: 0,
    });
    addNew({
      content: content.value,
      author,
      info,
      votes: 0,
    });

    handleNotification(content);

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
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
