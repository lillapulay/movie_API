import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom'; // BrowserRouter handles state-based routing, hash-based routing WOULD be handled by HashRouter
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import './main-view.scss';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
      favorites: []
    };
  }

  getMovies(token) {
    axios.get('https://mymovieapi2020.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` } // Not '' !!!
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    // Persisting auth. data
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        favorites: JSON.parse(localStorage.getItem('favorites')) // Gets what's stored in loc.St. and converts this stringified array back to an actual array
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {    // Parameter renamed as we need to use both user and token
    console.log(authData);
    this.setState({
      user: authData.user.Username,  // Username has been saved in the user state
      favorites: authData.user.Favorites // Favorites -||-
    });

    localStorage.setItem('token', authData.token);  //Auth info received from the handleSubmit method (token+user) has been saved in localStorage
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('favorites', JSON.stringify(authData.user.Favorites)); // Persists the fav. data in loc.St -> reload, etc. fixed
    this.getMovies(authData.token); // 'this' refers to the MainView class here
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    alert("Goodbye!");  // Will remove this later, same for the registration one
    window.open('/', '_self');
  }

  // Allows the user to set the favorite state for a movie
  setFavorites(newFavorites) {
    this.setState({
      favorites: newFavorites // (favorites: favorites -> was the reason behind the delete favorite error!)
    });

    localStorage.setItem('favorites', JSON.stringify(newFavorites)); // Persists in loc.St., reload fixed
  }

  render() {
    const { movies, user, favorites } = this.state;

    if (!movies) return <div className="main-view" />;

    return (
      <Container fluid>
        <Router>
          {user ? (<Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">
              <b>MyFlix</b>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">
                  Home
							</Nav.Link>
                <Nav.Link as={Link} to="/user">
                  Account
							</Nav.Link>
                <Nav.Link as={Link} to="/about">
                  About
							</Nav.Link>
                <Nav.Link as={Link} to="/contact">
                  Contact
							</Nav.Link>
                <Nav.Link onClick={() => this.onLoggedOut()}>
                  <b>Log Out</b>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>) : null}
          <br />

          <Route exact path="/" render={() => {
            if (!user) return (<LoginView onSignedIn={(user) => this.onLoggedIn(user)} />);
            return <Row> {movies.map((m) => <MovieCard key={m._id} movie={m} />)} </Row>
          }} />

          <Route path="/register" render={() => <RegistrationView />} />

          <Route path="/movies/:movieId" render={({ match }) => (
            <MovieView movie={movies.find((m) => m._id === match.params.movieId)} favorites={favorites}
              setFavorites={(newValue) => this.setFavorites(newValue)} />
          )} />

          <Route path="/movies/director/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return (<DirectorView director={movies.find((m) => m.Director.Name === match.params.name).Director} />);
          }} />

          <Route path="/movies/genres/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return (<GenreView genre={movies.find((m) => m.Genre.Name === match.params.name).Genre} />);
          }} />

          <Route exact path="/user" render={() =>
            <ProfileView favorites={favorites} movies={movies}
              setFavorites={(newValue) => this.setFavorites(newValue)} />} />
          { /* The prop function could be named sg else;
              props.movies: array of movie objects with all details,
              props.favorites: array of fav. movie IDs without details. */}


        </Router>
      </Container>
    );
  }
}