import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = props => {
  const { isSavedMovies, movies, onMovieLikeClick, movieAdderIsVisible, onAddClick } = props;

  return (
    <>
      <section className={`moviesCardList ${movies.length === 0 ? 'moviesCardList_type_invisible' : '' }`}>
        {movies.map((movie) => (
          <div key={movie.movieId}>
            <MoviesCard 
              title={movie.nameRU}
              src={movie.image}
              alt={movie.nameRU}
              movieOwnerId={movie.owner}
              duration = {movie.duration}
              id = {movie.movieId}
              userId = 'me'
              onMovieLikeClick = {onMovieLikeClick}
              isSavedMovies = {isSavedMovies}
            />
          </div>
      ))}
      </section>  
      <section className="moviesCardList__adder">
        <button type="button" className={`moviesCardList__adderContainer ${movieAdderIsVisible ? 'moviesCardList__adderContainer_visible' : ''}`} onClick={onAddClick}>
          <p className="moviesCardList__adderText">Ещё</p>
        </button>
      </section>

    </>
    );
}

export default MoviesCardList;
