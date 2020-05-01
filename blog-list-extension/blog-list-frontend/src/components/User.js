import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { Card, Button, Spinner } from 'react-bootstrap';

const User = () => {
  const users = useSelector((state) => state.users);
  const id = useParams().id;
  const user = users.find((user) => user.id === id);

  if (!user) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {' '}
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <div>
      <div>
        <h3>{user.name}</h3>
        <p className="muted">{user.username}</p>
      </div>
      <h5 className="text-center">My blogs</h5>
      <hr></hr>
      <ul>
        {' '}
        {user.blogs.map((blog) => (
          // <li key={blog.id}>{blog.title}</li>
          <Card className="text-center mb-2" key={blog.id}>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              <Link to={`/blogs/${blog.id}`}>
                <Button variant="primary">Go somewhere</Button>
              </Link>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default User;
