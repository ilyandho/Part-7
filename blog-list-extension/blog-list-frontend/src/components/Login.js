import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

import LoginForm from './LoginForm';

const Login = () => {
  const { message, messageType } = useSelector((state) => state.notification);

  return (
    <div className="container">
      <Card
        style={{
          width: '70%',
          height: '100%',
          margin: 'auto auto',
          marginTop: '10rem',
          minWidth: '250px',
          maxWidth: '400px',
        }}>
        <Card.Header style={{ textalign: 'center', width: '100%' }}>
          <h3>Login to application</h3>
        </Card.Header>
        <Card.Body>
          <div className={messageType}>
            <p>{message}</p>
          </div>
          <LoginForm />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
