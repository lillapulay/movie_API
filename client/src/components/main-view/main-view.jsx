import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom"; // BrowserRouter handles state-based routing, hash-based routing WOULD be handled by HashRouter

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Button from "react-bootstrap/Button";

import "./main-view.scss";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: false
    };
  }

  getMovies(token) {
    axios.get('https://mymovieapi2020.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` } // Not '' !!!!
    })
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

  // One of the "hooks" available in a React Component
  componentDidMount() {
    // Persisting auth. data
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {    // Parameter renamed as we need to use both user and token
    console.log(authData);
    this.setState({
      user: authData.user.Username  // Username has been saved in the user state
    });

    localStorage.setItem('token', authData.token);  //Auth info received from the handleSubmit method (token+user) has been saved in localStorage
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token); // this refers to the MainView class here
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    alert("Goodbye!");
    window.open('/', '_self');
  }

  onRegister(register) {
    this.setState({
      register: register
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!user && register === false) return <LoginView onSignedIn={user => this.onLoggedIn(user)}
      notReggedYet={(register) => this.onRegister(register)} />;

    if (register) return <RegistrationView notReggedYet={(register) => this.onRegister(register)} />;


    return (
      <Router>
        <div className="main-view">
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return movies.map(m => <MovieCard key={m._id} movie={m} />)
          }
          } />
          <Route path="/register" render={() => <RegistrationView />} />
          <Route exact path="/" render={() => movies.map(m =>
            <MovieCard key={m._id} movie={m} />)} />
          <Route path="/movies/:movieId" render={({ match }) =>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }
          } />
        </div>
      </Router>
    );

    //Temporary position for logout button!!!! Add navbar
    /* RETURN - code before router
     return (
       <div className="main-view">
         <Button type="button" className="logout" variant="info" onClick={() => this.onLoggedOut()}>
           <b>Log Out</b>
         </Button>
         <Container>
           <Row>
             {selectedMovie
               ? (<MovieView movie={selectedMovie} onClick={() => this.onMovieClick()} />)
               : (movies.map((movie) => (
                 <Col xs={12} sm={6} md={4} key={movie._id}>
                   <MovieCard key={movie._id} movie={movie} onClick={(movie) => this.onMovieClick(movie)} />
                 </Col>
               ))
               )}
           </Row>
         </Container>
       </div>
     ); */
  }
}