import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./login-view.scss";

import { RegistrationView } from '../registration-view/registration-view';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication, then call props.onLoggedIn(username) */
    props.onSignedIn(username);
  };

  const notMemberYet = (e) => {
    e.preventDefault();
    props.notReggedYet(true);
  };

  return (
    <Container fluid className="login-container">
      <Row>
        <Col>
          <h1 className="main-title">myFlix</h1>
          <Form className="login-form">
            <Form.Group controlId="formBasicUsername">
              <h3 className="form-title">Log In</h3>
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="info" type="submit" onClick={handleSubmit}>Sign In</Button><br></br>
            <button type="button" className="btn btn-link" onClick={notMemberYet}>
              Not a member yet? Sign up here!
        </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}