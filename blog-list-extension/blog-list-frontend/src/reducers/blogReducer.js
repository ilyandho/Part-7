/* eslint-disable indent */
import blogService from '../services/blogs';
import { setMessage } from './notificationReducer';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIAL':
      return action.data;
    case 'NEW':
      return action.data;
    case 'UPDATE':
      return action.data;
    case 'DELETE':
      return action.data;
    case 'UNLOGGEDIN':
      return [];
    case 'UPDATE-COMMENT':
      return action.data;
    case 'UPDATE-LIKE':
      return action.data;
    default:
      return state;
  }
};

export const innitialiseBlogs = (user) => {
  return async (dispatch) => {
    const response = await blogService.getAll();
    if (user) {
      dispatch({
        type: 'INITIAL',
        data: response,
      });
    } else {
      dispatch({
        type: 'UNLOGGEDIN',
        data: [],
      });
    }
  };
};

export const createBlog = (newBlog, blogs, user) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create(newBlog);
      const newBlogs = blogs.concat(blog);
      dispatch({
        type: 'NEW',
        data: newBlogs,
      });

      dispatch(
        setMessage({
          message: `a new blog ${newBlog.title} by ${user.name} added`,
          messageType: 'success',
        })
      );

      setTimeout(() => {
        dispatch(setMessage());
      }, 5000);
    } catch (err) {
      dispatch(
        setMessage({ message: err.response.data.error, messageType: 'danger' })
      );
      setTimeout(() => {
        dispatch(setMessage());
      }, 5000);
    }
  };
};

export const deleteBlog = (objDel, blogs) => {
  return async (dispatch) => {
    if (window.confirm(`Remove blog ${objDel.title}`)) {
      try {
        await blogService.remove(objDel.id);
        dispatch(
          setMessage({
            message: `${objDel.title} has been deleted`,
            messageType: 'danger',
          })
        );

        setTimeout(() => {
          dispatch(setMessage());
        }, 5000);

        const remainingBlogs = blogs.filter((blog) => blog.id !== objDel.id);

        dispatch({
          type: 'DELETE',
          data: remainingBlogs,
        });
      } catch (err) {
        dispatch(
          setMessage({
            message: err.response.data.error,
            messageType: 'danger',
          })
        );
        setTimeout(() => {
          dispatch(setMessage());
        }, 5000);
      }
    }
  };
};

export const updateBlog = (id, newObj, blogs) => {
  return async (dispatch) => {
    try {
      const response = await blogService.update(id, newObj);

      const updatedBlogs = await blogs.map((blog) => {
        if (blog.id === response.id) {
          blog.likes += 1;
        }
        return blog;
      });

      dispatch({
        type: 'UPDATE',
        data: updatedBlogs,
      });

      dispatch(
        setMessage({
          message: `Successfully updated ${response.title}`,
          messageType: 'success',
        })
      );

      setTimeout(() => {
        dispatch(setMessage());
      }, 5000);
    } catch (err) {
      dispatch(
        setMessage({ message: err.response.data.error, messageType: 'danger' })
      );
      setTimeout(() => {
        dispatch(setMessage());
      }, 5000);
    }
  };
};

export const updateBlogComents = (id, comment, blogs) => {
  return async (dispatch) => {
    try {
      const response = await blogService.updateComments(id, comment);

      const updatedBlogComment = blogs.map((blog) => {
        if (blog.id === response.id) {
          blog.comments = response.comments;
        }
        return blog;
      });
      dispatch({
        type: 'UPDATE-COMMENT',
        data: updatedBlogComment,
      });
    } catch (err) {
      dispatch(
        setMessage({ message: err.response.data.error, messageType: 'danger' })
      );
      setTimeout(() => {
        dispatch(setMessage());
      }, 5000);
    }
  };
};

export const updateBlogLikes = (id, blogs) => {
  return async (dispatch) => {
    try {
      const response = await blogService.updateLikes(id);

      const updatedBlogLike = blogs.map((blog) => {
        if (blog.id === response.id) {
          blog.likes = response.likes;
        }
        return blog;
      });
      dispatch({
        type: 'UPDATE-LIKE',
        data: updatedBlogLike,
      });
    } catch (err) {
      dispatch(
        setMessage({ message: err.response.data.error, messageType: 'danger' })
      );
      setTimeout(() => {
        dispatch(setMessage());
      }, 5000);
    }
  };
};
export default blogReducer;
