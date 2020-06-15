import React, { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, createUsername] = useState("");
  const [password, createPassword] = useState("");
  const [email, createEmail] = useState("");
  const [birthday, createBirthday] = useState("");

  const handleRegistration = (e) => {
    e.preventDefault();

    // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
    axios.post("https://mymovieapi2020.herokuapp.com/users", { // Maybe change endpoint to '/' or create /login?
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then((response) => {
        const data = response.data;
        alert('Account successfully created.');
        console.log(data);
        window.open("/", "_self"); // _self - URL replaces the current page
      })
      .catch((e) => {
        console.log("Something went wrong.");
      });
  };

  return (
    // https://react-bootstrap.github.io/components/forms/ / birthday needs fix - type: date suitable?
    <Form className="registration-form">

      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => createUsername(e.target.value)} />
        <Form.Text className="text-muted">
          Username must be at least 5 characters long.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => createPassword(e.target.value)} />
        <Form.Text className="text-muted">
          Password must be at least 8 characters long and must contain at least one number.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address:</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => createEmail(e.target.value)} />
        <Form.Text className="text-muted">
          Please make sure the email address entered is valid.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicBirthday">
        <Form.Label>Date of birth:</Form.Label>
        <Form.Control type="date" placeholder="Enter date of birth" value={birthday} onChange={(e) => createBirthday(e.target.value)} />
        <Form.Text className="text-muted">
          Please use the following format: dd/mm/yyyy.
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleRegistration}>Sign Up</Button>
    </Form>
  );
}