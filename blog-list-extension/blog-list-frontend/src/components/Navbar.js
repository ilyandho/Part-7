import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Form, NavItem, Button } from 'react-bootstrap';

const NavBar = ({ user, handleLogOut }) => {
  return (
    <div>
      <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
        <Navbar.Brand>
          <NavLink
            tag={Link}
            to="/"
            className="nav-link"
            style={{ color: '#fff' }}>
            Blog App
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavItem>
              <NavLink
                tag={Link}
                to="/"
                className="nav-link"
                activeClassName="active">
                Blogs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                to="/users"
                className="nav-link"
                activeClassName="active">
                Users
              </NavLink>
            </NavItem>
          </Nav>
          <Navbar.Collapse className="justify-content-end mr-sm-2">
            <Navbar.Text>
              Signed in as: <span style={{ color: '#fff' }}>{user}</span>
            </Navbar.Text>
          </Navbar.Collapse>
          <Form inline className="ml-sm-2">
            <Button variant="outline-light" onClick={handleLogOut}>
              LogOut
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
