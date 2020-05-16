import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

import LoginForm from './LoginForm';
import NewUser from './NewUser';
const Login = () => {
  const { message, messageType } = useSelector((state) => state.notification);
  const [page, setPage] = useState('login');

  return (
    <div
      className="container"
      style={{
        width: '100%',
        height: '100%',
        // marginTop: '3rem',
        // minWidth: '250px',
        // maxWidth: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Card
        style={{
          width: '70%',
          height: '100%',
          margin: 'auto auto',
          marginTop: '3rem',
          minWidth: '250px',
          // maxWidth: '400px',
        }}>
        <Card.Header style={{ textalign: 'center', width: '100%' }}>
          <h3>Login to application</h3>
        </Card.Header>
        <Card.Body>
          <div className={messageType}>
            <p>{message}</p>
          </div>
          {page === 'login' ? (
            <LoginForm setPage={setPage} />
          ) : (
            <NewUser setPage={setPage} />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
