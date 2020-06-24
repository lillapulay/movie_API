import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'

import "./movie-view.scss";

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Col>
        <div className="movie-view">
          <ListGroup>
            <ListGroup.Item>
              <Image className="img-fluid" src={movie.ImagePath} />
            </ListGroup.Item>

            <ListGroup.Item>
              <span className="label">Title: <br /> </span>
              <span className="value">{movie.Title}</span>
            </ListGroup.Item>

            <ListGroup.Item>
              <span className="label">Description: <br /> </span>
              <span className="value">{movie.Description}</span>
            </ListGroup.Item>

            <ListGroup.Item>
              <span className="label">Genre: <br /> </span>
              <span className="value">{movie.Genre.Name}</span>
            </ListGroup.Item>

            <ListGroup.Item>
              <span className="label">Director: <br /> </span>
              <span className="value">{movie.Director.Name}</span>
            </ListGroup.Item>

            <ListGroup.Item>
              <span className="label">Actors: <br /> </span>
              <span className="value">{movie.Actors.join(', ')}</span>
            </ListGroup.Item>

            <ListGroup.Item>
              <span className="label">Release year: <br /> </span>
              <span className="value">{movie.ReleaseYear}</span>
            </ListGroup.Item>

            <ListGroup.Item>
              <Link to={`/`}>
                <Button variant="info">
                  <b>Back</b>
                </Button>
              </Link>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <Link to={`/movies/director/${movie.Director.Name}`}>
              <Button variant="info">
                <b>View Director</b>
              </Button>
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to={`/movies/genres/${movie.Genre.Name}`}>
              <Button variant="info">
                <b>View Genre</b>
              </Button>
            </Link>
          </ListGroup.Item>

          <br />
        </div>
      </Col >
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.object.isRequired,
    Director: PropTypes.object.isRequired,
    Actors: PropTypes.array.isRequired,
    ReleaseYear: PropTypes.string.isRequired
  }).isRequired
};