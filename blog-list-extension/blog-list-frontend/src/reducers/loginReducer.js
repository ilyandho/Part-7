/* eslint-disable indent */
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setMessage } from './notificationReducer';

const loginReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return null;
    case 'LOGGEDIN':
      return action.data;
    case 'LOGIN':
      return action.data;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export const initialiseUser = () => {
  const loggedInUserJSON = window.localStorage.getItem('loggedInBlogAppUser');

  if (loggedInUserJSON) {
    return (dispatch) => {
      const user = JSON.parse(loggedInUserJSON);
      blogService.setToken(user.token);

      dispatch({
        type: 'LOGGEDIN',
        data: user,
      });
    };
  }
  return (dispatch) => {
    dispatch({
      type: 'INIT',
    });
  };
};

export const login = (obj) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(obj);
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user));
      dispatch({
        type: 'LOGIN',
        data: user,
      });
    } catch (error) {
      dispatch(
        setMessage({
          message: 'Wrong credentials. Check the username or password',
          messageType: 'danger',
        })
      );

      setTimeout(() => {
        dispatch(setMessage());
      }, 5000);
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedInBlogAppUser');
    blogService.setToken(null);
    dispatch({
      type: 'LOGOUT',
    });
  };
};

export default loginReducer;
