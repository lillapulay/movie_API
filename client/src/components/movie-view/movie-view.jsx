import React from 'react';

import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container';
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
      <div className="movie-view">
        <Container className="movie-container">
          <ListGroup>
            <ListGroup.Item>
              <Image className="movie-poster" src={movie.ImagePath} />
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
              <Button onClick={() => onClick()} className="back-button" type="button" variant="info">Back</Button>
            </ListGroup.Item>
          </ListGroup>
        </Container >
      </div>
    );
  }
}