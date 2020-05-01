import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Blog = ({ blog }) => {
  return (
    <Card className="mb-2 mt-2">
      <Card.Body>{blog.title}</Card.Body>
      <Card.Footer>
        <Link to={`/blogs/${blog.id}`}> Read more ..</Link>
      </Card.Footer>
    </Card>
  );
};

Blog.prototype = {
  blog: PropTypes.object.isRequired,
};
export default Blog;
