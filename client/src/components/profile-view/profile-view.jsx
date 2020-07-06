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
import Card from 'react-bootstrap/Card';

import './profile-view.scss';

export function ProfileView(props) {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [email, updateEmail] = useState("");
  const [birthday, updateBirthday] = useState("");

  // Contains the movie objects, not just the IDsm filters out the movies that are not amongst the favorites
  let detailedMovies = props.movies.filter(movie => {
    return props.favorites.includes(movie._id);
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log();
    /* Send a request to the server for authentication */
    axios.put(`https://mymovieapi2020.herokuapp.com/users/${localStorage.getItem("user")}`, { // Not ''!!!
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Not ''!!!
    })
      .then((response) => {
        const data = response.data;
        alert('Account successfully updated. Please log in again.'); // Will remove this later
        console.log(data);
        localStorage.removeItem("token", "user", "favorites");
        window.open("/", "_self"); // _self - URL replaces the current page
      })
      .catch((e) => {
        alert("Something went wrong.");
      });
  };

  const deleteAccount = (e) => {
    e.preventDefault();
    console.log();
    axios.delete(`https://mymovieapi2020.herokuapp.com/users/${localStorage.getItem("user")}`, { // Not ''!!!
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        const data = response.data;
        alert("Account successfully deleted.");
        console.log(data);
        localStorage.removeItem("token", "user", "favorites");
        window.open("/client", "_self");
      })
      .catch((e) => {
        alert("Something went wrong.");
      });
  };

  const deleteFavorite = (e, movieID) => { // Event object + movieID passed to it, same for the event listener (button)
    e.preventDefault();
    axios.delete(`https://mymovieapi2020.herokuapp.com/users/${localStorage.getItem("user")}/movies/${movieID}`, { // Not ''!!!
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        const data = response.data;
        console.log(data); // Check to see how the object looks like!
        alert("Movie removed from favorites.");
        props.setFavorites(data.Favorites);
      })
      .catch((e) => {
        alert("Something went wrong.");
      });
  };

  return (
    <Row>
      <Col>
        <Container fluid>
          <Row className="profile-container">
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
              </Form>

              <Button className="update-button" variant="warning" type="submit" onClick={handleUpdate}>
                <b>Update details</b>
              </Button>
              <br />
              <Button className="delete-button" variant="danger" type="submit" onClick={deleteAccount}>
                <b>Delete account</b>
              </Button>
              <br />
              <Link to={`/`}>
                <Button className="back-button" variant="info">
                  <b>Back</b>
                </Button>
                <br />
              </Link>
            </Col>
          </Row>

          <Row>
            <Col>
              <h3 className="form-title">
                <b>Your favorites</b>
              </h3>
            </Col>
          </Row>

          <Row className="fav-movies">{detailedMovies.map(m =>
            <Col key={m._id} xs={12} s={6} md={4} l={4} xl={3}>
              <Card>
                <Card.Img className="img-fluid" variant="top" src={m.ImagePath} />
                <Card.Body className="profile-card-body">
                  <Link to={`/movies/${m._id}`}>
                    <Card.Title>{m.Title}</Card.Title>
                  </Link>
                </Card.Body>
              </Card >
              <Button className="remove-fav" variant="warning" type="submit" onClick={(e) => { deleteFavorite(e, m._id) }}>
                <b>Remove from favorites</b>
              </Button>
            </Col>
          )}
          </Row>
        </Container>
      </Col>
    </Row>

  );
}

ProfileView.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      ImagePath: PropTypes.string
    })
  ).isRequired,
  setFavorites: PropTypes.func.isRequired
};