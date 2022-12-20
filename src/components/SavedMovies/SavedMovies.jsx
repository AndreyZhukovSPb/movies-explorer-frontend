import React from 'react';
import cn from 'classnames';
import './SavedMovies.css';
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'


const SavedMovies = props => {
  const { isLoggedIn, onSubmit, favoriteMovies, onMovieLikeClick, movieAdderIsVisible, className, onNavMenuClick } = props;
  const isSavedMovies = true;


  return (
    <>
      <Header
        isLoggedIn = {isLoggedIn}
        className = "savedMovies__header"
        onNavMenuClick = {onNavMenuClick}
      />
      <main className={cn("savedMovies", className)}>
        <SearchForm
          onSubmit = {onSubmit}
        />
        <MoviesCardList
          movies = {favoriteMovies}
          onMovieLikeClick = {onMovieLikeClick}
          movieAdderIsVisible = {movieAdderIsVisible}
          isSavedMovies = {isSavedMovies}
        />
      </main>
    </>
    );
}

export default SavedMovies;