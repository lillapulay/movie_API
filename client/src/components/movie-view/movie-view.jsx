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

  //Axios post and put methods: 1. URL 2. data 3. config.
  addFavorite(e, movieID) {
    axios.post(
      `https://mymovieapi2020.herokuapp.com/users/${localStorage.getItem("user")}/movies/${movieID}`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
    )
      .then((response) => {
        const data = response.data;
        console.log(data); // Check to see how the object looks like!
        alert("Movie added to favorites.");
        this.props.setFavorites(data.Favorites); // MovieView is a class component, so it needs 'this', also in the button callback
      })
      .catch((e) => {
        alert("Something went wrong.");
      });
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Row className="movie-view">
        <Col>
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

            {/* <ListGroup.Item>
              <Button variant="info" onClick={(e) => { this.addFavorite(e, movie._id) }}>
                <b>Add to favorites</b>
              </Button>
            </ListGroup.Item> */}

            {this.props.favorites.includes(this.props.movie._id) ?
              <ListGroup.Item>
                <b>Already added to favorites.</b>
              </ListGroup.Item>
              : <ListGroup.Item>
                <Button variant="info" onClick={(e) => { this.addFavorite(e, movie._id) }}>
                  <b>Add to favorites</b>
                </Button>
              </ListGroup.Item>}

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

        </Col >
      </Row>
    );
  }
}

// Needs fix - console throws error for 'movie' in Genre and Director views ???? - Seems to be a bug
// main-view.jsx -> line 133???
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