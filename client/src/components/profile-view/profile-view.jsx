import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import './profile-view.scss';

export function ProfileView(props) {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [email, updateEmail] = useState("");
  const [birthday, updateBirthday] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log();
    /* Send a request to the server for authentication */
    axios.put('https://mymovieapi2020.herokuapp.com/users/${localStorage.getItem("user")}', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Not ''!!!
    })
      .then((response) => {
        const data = response.data;
        alert('Account successfully updated.'); // Will remove this later
        console.log(data);
        window.open("/", "_self"); // _self - URL replaces the current page
      })
      .catch((e) => {
        alert("Something went wrong.");
      });
  };

  return (

    <Container className="profile-container">
      <Row>
        <Col>
          <Form className="profile-form">
            <h3 className="form-title"><b>Account Settings</b></h3>

            <Form.Group controlId="updateUsername">
              <Form.Label> Username: </Form.Label>
              <Form.Control type="text" placeholder="Enter new username" onChange={(e) => updateUsername(e.target.value)} />
              <Form.Text className="text-muted">
                <i>Username must be at least 5 characters long.</i>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="updatePassword">
              <Form.Label> Password: </Form.Label>
              <Form.Control type="password" placeholder="Enter new password" onChange={(e) => updatePassword(e.target.value)} />
              <Form.Text className="text-muted">
                <i>Password must be at least 8 characters long and must contain at least one number.</i>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="updateEmail">
              <Form.Label> Email address: </Form.Label>
              <Form.Control type="email" placeholder="Enter new email" onChange={(e) => updateEmail(e.target.value)} />
              <Form.Text className="text-muted">
                <i>Please make sure the email address entered is valid.</i>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="updateBirthday">
              <Form.Label> Date of birth: </Form.Label>
              <Form.Control type="date" placeholder="Enter new date of birth" onChange={(e) => updateBirthday(e.target.value)} />
              <Form.Text className="text-muted">
                <i>Please use the following format: dd/mm/yyyy.</i>
              </Form.Text>
            </Form.Group>

            <Button variant="info" type="submit" onClick={handleUpdate}><b>Update details</b></Button>
            <br />
            <Link to={`/`}>
              <Button variant="info">
                <b>Back</b>
              </Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}


/* Need to add PropTypes */