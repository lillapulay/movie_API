import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  addFavorite(e, movieID) {
    axios.post(
      `https://mymovieapi2020.herokuapp.com/users/${localStorage.getItem("user")}/movies/${movieID}`,
      {}, // Empty object as the 2nd argument?
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
    )
      .then((response) => {
        const data = response.data;
        console.log(data); // Check to see how the object looks like!
        alert("Movie added to favorites.");
        this.props.setFavorites(data.Favorites);
      })
      .catch((e) => {
        alert("Something went wrong.");
      });
  }

  render() {
    const { movie, movieID } = this.props;

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

            <ListGroup.Item>
              <Link>
                <Button variant="info" onClick={(e) => { this.addFavorite(e, movieID) }}> {/* Callback? */}
                  <b>Add to favorites</b>
                </Button>
              </Link>
            </ListGroup.Item>

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

          </ListGroup>

          <br />
        </div>
      </Col >
    );
  }
}

// Needs fix - console throws error for 'movie' in Genre and Director views ????
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