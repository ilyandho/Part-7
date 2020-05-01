import React from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../reducers/loginReducer';

import { Form, Button, Row } from 'react-bootstrap';

const LoginForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    dispatch(login({ username, password }));
  };

  return (
    <Form
      onSubmit={(event) => handleSubmit(event)}
      className="container"
      style={{ height: '100%' }}>
      <Form.Group controlId="formGroupUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
        />
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" />
      </Form.Group>
      <Form.Group as={Row} controlId="formGroupLoginBtn">
        <Button
          type="submit"
          variant="primary"
          style={{ width: '100%', margin: 'auto' }}>
          {' '}
          Login in
        </Button>
      </Form.Group>
    </Form>
  );
};

export default LoginForm;
