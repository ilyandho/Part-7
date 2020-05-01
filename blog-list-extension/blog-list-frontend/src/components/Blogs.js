import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddBlogForm from './AddBlogForm';
import Blog from './Blog';

import { createBlog, deleteBlog, updateBlog } from '../reducers/blogReducer';

const Blogs = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  const addBlog = async (obj) => {
    // newBlog, blogs,user
    dispatch(createBlog(obj, blogs, user));
  };

  const updateBog = async (id, obj) => {
    // id, newObj, blogs
    dispatch(updateBlog(id, obj, blogs));
  };

  const deleteBog = async (obj) => {
    // objDel, blogs
    dispatch(deleteBlog(obj, blogs));
  };

  // Sort the blogs by most likes
  const sortBlogs = (array) => {
    const sorted = array.sort((a, b) => {
      return b.likes - a.likes;
    });
    return sorted;
  };

  return (
    <div>
      <h3>Blogs</h3>
      {/* <Toggable showButtonLabel="New Blog" ref={createBlogRef}> */}
      <AddBlogForm addBlog={addBlog}></AddBlogForm>
      {/* </Toggable> */}

      <div className="blog-list">
        {sortBlogs(blogs).map((blog) => (
          <Blog
            user={user}
            blog={blog}
            key={blog.id}
            update={updateBog}
            deleteBlog={deleteBog}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
