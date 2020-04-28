import React from 'react';
import { useField, useResource } from './hooks';

const App = () => {
  let content = useField('text');
  const name = useField('text');
  const number = useField('text');

  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  console.log('notes', notes);
  console.log('persons', persons[0]);
  // persons.map((one) => one.map((two) => console.log(two)));

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    content.onReset();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    handlePersonsReset();
  };

  const handlePersonsReset = () => {
    name.onReset();
    number.onReset();
  };
  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>{' '}
        <button type="reset" onClick={content.onReset}>
          {' '}
          reset
        </button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
        <button type="reset" onClick={handlePersonsReset}>
          cancel
        </button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
