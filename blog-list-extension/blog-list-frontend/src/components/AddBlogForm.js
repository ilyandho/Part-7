import React from 'react';
import PropTypes from 'prop-types';

import { Card, Accordion, Button, Form } from 'react-bootstrap';

import useField from '../hooks/useField';

const AddBlogForm = ({ addBlog }) => {
  const title = useField('text');
  const url = useField('url');

  const handleSubmit = (event) => {
    event.preventDefault();
    addBlog({
      title: title.value,
      url: url.value,
    });
    title.onReset();
    url.onReset();
  };
  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="primary" eventKey="1">
              Create
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicTitle">
                  <Form.Label>Blog Title</Form.Label>
                  <Form.Control {...title} placeholder="Enter blog title" />
                </Form.Group>
                <Form.Group controlId="formBasicUrl">
                  <Form.Label>Blog Url</Form.Label>
                  <Form.Control {...url} placeholder="Url" />
                </Form.Group>
                <Button variant="primary" type="submit" id="createBtn">
                  Create
                </Button>{' '}
                <Accordion.Toggle as={Button} variant="danger" eventKey="1">
                  Cancel
                </Accordion.Toggle>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

AddBlogForm.prototype = {
  addBlog: PropTypes.func.isRequired,
};

export default AddBlogForm;
