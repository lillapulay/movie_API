import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import "./main-view.scss";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: false
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://mymovieapi2020.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
      register: true
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!user && register === false) return <LoginView onSignedIn={user => this.onLoggedIn(user)}
      notReggedYet={register => this.onRegister(register)} />;

    if (register) return <RegistrationView />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Container>
          <Row>
            {selectedMovie
              ? (<MovieView movie={selectedMovie} onClick={() => this.onMovieClick()} />)
              : (movies.map((movie) => (
                <Col key={movie._id}>
                  <MovieCard key={movie._id} movie={movie} onClick={(movie) => this.onMovieClick(movie)} />
                </Col>
              ))
              )}
          </Row>
        </Container>
      </div>
    );
  }
}