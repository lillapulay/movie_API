import React from 'react';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <div onClick={() => onClick(movie)} className="movie-card">
        <p /><img className="movie-poster" src={movie.ImagePath} />
        <br />
        {movie.Title}
        <br />
        {movie.Description}
      </div>
    );
  }
}