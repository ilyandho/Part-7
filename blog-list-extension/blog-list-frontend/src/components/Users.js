import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Table } from 'react-bootstrap';

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <Row className="justify-content-md-center">
        <h2>Users</h2>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Users</th>
            <th>Number of blogs Created</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, i = 0) => {
            i = i++;
            return (
              <tr key={user.id}>
                <td>{i}</td>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
