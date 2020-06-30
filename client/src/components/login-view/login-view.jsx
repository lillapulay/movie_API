import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://mymovieapi2020.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onSignedIn(data); // Username changed to data because we also need the token
      })
      .catch(e => {
        console.log('User not found.')
      });
  };

  return (
    <Row className="login-container">
      <Col>
        <Form className="login-form">
          <Form.Group controlId="formBasicUsername">
            <h3 className="form-title"><b>Log In</b></h3>
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Button variant="info" type="submit" onClick={handleSubmit}><b>Sign In</b></Button>
          <br />

          <Link to={`/register`}>
            <button type="button" className="btn btn-link">
              <i>Not a member yet? Click here to register!</i>
            </button>
          </Link>
        </Form>
      </Col>
    </Row>
  );
}

LoginView.propTypes = {
  onSignedIn: PropTypes.func.isRequired
};