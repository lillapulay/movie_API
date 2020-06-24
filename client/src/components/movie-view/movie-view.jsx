import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <Col>
        <div className="movie-view">
          <ListGroup>
            <ListGroup.Item>
              <Image className="img-fluid" src={movie.ImagePath} />
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="label">Title: <br></br> </span>
              <span className="value">{movie.Title}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="label">Description: <br></br> </span>
              <span className="value">{movie.Description}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="label">Genre: <br></br> </span>
              <span className="value">{movie.Genre.Name}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="label">Director: <br></br> </span>
              <span className="value">{movie.Director.Name}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="label">Actors: <br></br> </span>
              <span className="value">{movie.Actors.join(', ')}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="label">Release year: <br></br> </span>
              <span className="value">{movie.ReleaseYear}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button onClick={() => onClick()} className="back-button" type="button" variant="info"><b>Back</b></Button>
            </ListGroup.Item>
          </ListGroup>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="info">Director</Button>
          </Link>
          <br></br>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="info">Genre</Button>
          </Link>
        </div>
      </Col>
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
  }).isRequired,
  onClick: PropTypes.func.isRequired
};