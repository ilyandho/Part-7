import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseurl = 'https://restcountries.eu/rest/v2/name/{name}?fullText=true';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  console.log(name);
  useEffect(() => {
    if (name === '') return setCountry(null);
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then((response) => {
        const country = response.data.find((country) => country.name === name);
        console.log(country);
        return setCountry(country);
      })
      .catch(() => setCountry({ found: false }));
    console.log(country);
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  console.log('Country', country);
  if (country === null) {
    console.log('null', country);
    return null;
  }

  if (country.found === false) {
    console.log('not found', country);
    return <div>not found...</div>;
  }
  console.log('Country final', country);
  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flag} height="100" alt={`flag of ${country.name}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
