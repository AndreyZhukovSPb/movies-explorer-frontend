import React from 'react';
import cn from 'classnames';
import './Movies.css';
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'


const Movies = props => {
  const { isLoggedIn, onSubmit, movies, onMovieLikeClick, onAddClick, movieAdderIsVisible, className, onNavMenuClick } = props;
  
  return (
    <>
      <Header
        isLoggedIn = {isLoggedIn}
        className = "movies__header"
        onNavMenuClick = {onNavMenuClick}
      />
      <main className={cn("movies", className)}>
        <SearchForm
          onSubmit = {onSubmit}
        />
        <MoviesCardList
          movies = {movies}
          onMovieLikeClick = {onMovieLikeClick}
          onAddClick = {onAddClick}
          movieAdderIsVisible = {movieAdderIsVisible}
        />
      </main>
    </>
    );
}

export default Movies;