import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

// Action creators
import { innitialiseBlogs } from './reducers/blogReducer';
import { initialiseUser, logout } from './reducers/loginReducer';
import { getUsers } from './reducers/userReducer';

// Components
import Login from './components/Login';
import Users from './components/Users';
import User from './components/User';
import Blogs from './components/Blogs';
import NavBar from './components/Navbar';

import './App.css';
import BlogDetails from './components/BlogDetails';

const App = () => {
  const user = useSelector((state) => state.user);
  const { message, messageType } = useSelector((state) => state.notification);

  const handleLogOut = async () => {
    dispatch(logout());
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(innitialiseBlogs(user));
    dispatch(getUsers());
  }, []);

  // Check if there is a logged in user in localStorage
  useEffect(() => {
    dispatch(initialiseUser());
  }, []);

  if (user === null) {
    return <Login />;
  }

  return (
    <div>
      <NavBar user={user.name} handleLogOut={handleLogOut} />

      <div className="container">
        {/* <div className={messageType}> */}
        <Alert variant={messageType}> {message}</Alert>
        {/* </div> */}

        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <BlogDetails />
          </Route>
          <Route path="/">
            <Blogs user={user} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
