import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, createUsername] = useState("");
  const [password, createPassword] = useState("");
  const [email, createEmail] = useState("");
  const [birthday, createBirthday] = useState("");

  /**
   * Registers a new user
   * Confirms registration in an alert
   * Redirects to login screen
   * @function handleSubmit
   * @axios
   * @param {*} e
   * @param {string} username
   * @param {string} password
   * @param {string} email
   * @param {date} birthday
   */

  const handleRegistration = (e) => {
    e.preventDefault();

    axios.post("https://mymovieapi2020.herokuapp.com/users", {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then((response) => {
        const data = response.data;
        alert('Account successfully created. Please log in to continue.');
        console.log(data);
        window.open("/client", "_self"); // _self - URL replaces the current page
      })
      .catch((e) => {
        alert("Something went wrong.");
      });
  };

  return (
    <Row className="registration-container">
      <Col>
        <Form className="registration-form">
          <h3 className="form-title"><b>Register</b></h3>

          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => createUsername(e.target.value)} />
            <Form.Text className="text-muted">
              <i>Username must be at least 5 characters long.</i>
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => createPassword(e.target.value)} />
            <Form.Text className="text-muted">
              <i>Password must be at least 8 characters long and must contain at least one number.</i>
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address:</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => createEmail(e.target.value)} />
            <Form.Text className="text-muted">
              <i>Please make sure the email address entered is valid.</i>
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicBirthday">
            <Form.Label>Date of birth:</Form.Label>
            <Form.Control type="date" placeholder="Enter date of birth" value={birthday} onChange={(e) => createBirthday(e.target.value)} />
            <Form.Text className="text-muted">
              <i>Please use the following format: dd/mm/yyyy.</i>
            </Form.Text>
          </Form.Group>

          <Button variant="info" type="submit" onClick={handleRegistration}><b>Sign Up</b></Button>
          <br />

          <Link to={`/`}>
            <button type="button" className="btn btn-link" >
              <i>Already registered? Click here to log in!</i>
            </button>
          </Link>
        </Form>
      </Col>
    </Row>
  );
}
