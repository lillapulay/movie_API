import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  // Add movies that belong in this genre?
  render() {
    const { movie, genre } = this.props;

    if (!genre) return null;

    return (
      <div>
        <Container>
          <Card>
            <Card.Body>
              <Card.Title>{genre.Name}</Card.Title>
              <Card.Text>Description: {genre.Description}</Card.Text>
              <Link to={`/`}>
                <Button variant="info"><b>Back</b></Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string
  }).isRequired,
};