import React from 'react';

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <span>by {anecdote.author}</span>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see{' '}
        <a href={anecdote.info} target="_blank" rel="noopener noreferrer">
          {anecdote.info}
        </a>
      </p>
    </div>
  );
};

export default Anecdote;
