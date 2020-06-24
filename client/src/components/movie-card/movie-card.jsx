import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Img className="img-fluid" variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="info">
              <b>View details</b>
            </Button>
          </Link>
          <br />
          <Link to={`/movies/director/${movie.Director.Name}`}>
            <Button variant="info">
              <b>View Director</b>
            </Button>
          </Link>
          <br />
          <Link to={`/movies/genres/${movie.Genre.Name}`}>
            <Button variant="info">
              <b>View Genre</b>
            </Button>
          </Link>
        </Card.Body>
      </Card >
    );
  }
}

// Needs to be updated
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};