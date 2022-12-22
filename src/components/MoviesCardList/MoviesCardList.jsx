import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = props => {
  const { isSavedMovies, movies, onMovieLikeClick, movieAdderIsVisible, onAddClick } = props;

  return (
    <>
      <section className={`moviesCardList ${movies.length === 0 ? 'moviesCardList_invisible' : '' }`}>
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
      <section className="moviesCardListAdder">
        <button type="button" className={`moviesCardListAdder__container ${movieAdderIsVisible ? 'moviesCardListAdder__container_visible' : ''}`} onClick={onAddClick}>
          <p className="moviesCardListAdder__text">Ещё</p>
        </button>
      </section>

    </>
    );
}

export default MoviesCardList;
