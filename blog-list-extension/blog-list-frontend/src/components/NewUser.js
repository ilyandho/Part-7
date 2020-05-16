import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Form, Button, Row } from 'react-bootstrap';
import userService from '../services/users';
import { login } from '../reducers/loginReducer';

const SignUp = ({ setPage }) => {
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formOk, setFormOk] = useState(false);
  const [display, setDisplay] = useState(0);
  const dispatch = useDispatch();

  const handleConfirm = (pass1, pass2) => {
    if (!pass1 || !pass2) {
      return false;
    }
    return pass1 === pass2 ? true : false;
  };
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setDisplay(1);
    }

    if (confirmPassword === password) {
      setDisplay(0);
    }

    if (
      !firstname ||
      !surname ||
      !username ||
      !password ||
      !confirmPassword ||
      !handleConfirm(password, confirmPassword)
    ) {
      setFormOk(false);
      return;
    }
    setFormOk(true);
  }, [firstname, surname, username, password, confirmPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!handleConfirm(password, confirmPassword)) {
      return;
    }
    const details = {
      name: `${firstname} ${surname} `,
      username,
      password,
    };
    await userService.create(details);

    dispatch(login({ username, password }));
  };

  return (
    <Form
      onSubmit={(event) => handleSubmit(event)}
      className="container"
      style={{}}>
      <Form.Group controlId="formGroupUserFirstName">
        <Form.Label>First Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter First Name"
          name="firstname"
          onChange={(event) => setFirstname(event.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formGroupUserSurnameName">
        <Form.Label>Surname:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Surname Name"
          name="surname"
          onChange={(e) => setSurname(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formGroupUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formGroupConfirmPassword">
        <Form.Label>Confirm Password: </Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          name="passwordConfirm"
          variant="danger"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <p style={{ color: 'red', opacity: display }}>
          {' '}
          - passwords must match
        </p>
      </Form.Group>
      <Form.Group as={Row} controlId="formGroupSignUpBtn">
        <Button
          type="submit"
          variant="danger"
          style={{ width: '100%', margin: 'auto', marginBottom: '0.8rem' }}
          disabled={formOk ? '' : 'disabled'}>
          {' '}
          SignUp
        </Button>
        <Button
          onClick={() => setPage('login')}
          type="submit"
          variant="primary"
          style={{ width: '100%', margin: 'auto' }}>
          {' '}
          Login
        </Button>
      </Form.Group>
    </Form>
  );
};

export default SignUp;
