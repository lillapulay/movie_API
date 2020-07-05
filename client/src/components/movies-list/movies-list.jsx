import React from 'react';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';

// Extracts visibilityFilter into a prop with the same name
const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

// MoviesList's props contains 2 properties - movies passed in MainView's render()
function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />;

  return filteredMovies.map(m => <MovieCard key={m._id} movie={m} />);
}

export default connect(mapStateToProps)(MoviesList);
// export default connect(mapStateToProps, null)(MoviesList); - list of actions is null
// mapStateToProps: function that converts the store into props that MoviesList component will use