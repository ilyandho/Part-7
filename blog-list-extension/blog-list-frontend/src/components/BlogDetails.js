import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { updateBlogComents, updateBlogLikes } from '../reducers/blogReducer';
import useField from '../hooks/useField';

import { Image, Spinner, Form, Col, Button, Card } from 'react-bootstrap';
import bg from '../images/holder.svg';

const BlogDetails = () => {
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const comment = useField('textarea');

  const blog = blogs.find((blog) => blog.id === id);

  const dispatch = useDispatch();
  const handleLike = () => {
    const blogId = blog.id;

    // id, newObj, blogs
    dispatch(updateBlogLikes(blogId, blogs));
  };

  const addComment = (event) => {
    event.preventDefault();
    dispatch(updateBlogComents(id, comment.value, blogs));
    comment.onReset();
  };

  function timeSince(date) {
    var seconds = Math.floor(new Date().getTime() / 1000 - date / 1000),
      interval = Math.floor(seconds / 31536000);

    if (interval > 1) return interval + 'years ago ';

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + 'mpnths ago';

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + 'days ago';

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + 'hrs ago';

    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + 'minutes ago ';

    return Math.floor(seconds) + 'secs ago';
  }
  if (!blog) {
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
      <div className="container">
        <Image
          src={bg}
          fluid
          style={{
            maxWidth: '100%',
            maxHeight: '300px !important',
            width: '100%',
          }}
        />
      </div>
      <h2>{blog.title}</h2>

      <p>
        <a href={blog.url} target="blank">
          {blog.url}
        </a>
      </p>

      <p>
        {blog.likes} likes
        <Button className="ml-2" variant="primary" onClick={handleLike}>
          like
        </Button>
      </p>

      <p>added by {blog.author}</p>
      <hr />

      <div className="container">
        <h3>{blog.comments.length} comments</h3>
        <Form onSubmit={(event) => addComment(event)}>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              {/* <Form.Label>City</Form.Label> */}
              <Form.Control
                {...comment}
                placeholder="Add comment ..."
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>

            <Col md="4">
              <Button type="submit">Add Comment</Button>
            </Col>
          </Form.Row>
        </Form>
        <Card style={{ width: '100%' }}>
          {blog.comments.map((comment) => {
            return (
              <Card key={comment.date} className="mb-2 mt-2">
                <Card.Text>{comment.text}</Card.Text>
                <Card.Subtitle className="mb-2 ml-auto mr-4 text-muted">
                  {timeSince(comment.date)} ago
                </Card.Subtitle>
              </Card>
            );
          })}
        </Card>
      </div>
    </div>
  );
};

export default BlogDetails;
