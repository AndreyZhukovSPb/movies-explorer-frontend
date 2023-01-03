import React from 'react';
import cn from 'classnames';
import './Movies.css';
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'


const Movies = props => {
          
  const { cleanErrors, serverError, hideSearchGeneralError, searchGeneralError, isLoggedIn, onSubmit, movies, onMovieLikeClick, onAddClick, className, onNavMenuClick, onCheckBoxClick, isCheked, onScreenSize, itemsToShow, queryToAdd, previousValue } = props;

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
          onCheckBoxClick = {onCheckBoxClick}
          isCheked = {isCheked}
          onScreenSize = {onScreenSize}
          previousValue = {previousValue}
          isSavedMovies = {false}
          hideSearchGeneralError= {hideSearchGeneralError}
          
        />
        <MoviesCardList
          movies = {movies}
          onMovieLikeClick = {onMovieLikeClick}
          onAddClick = {onAddClick}
          onScreenSize = {onScreenSize}
          itemsToShow={itemsToShow}
          queryToAdd={queryToAdd}
          isSavedMovies = {false}
          searchGeneralError = {searchGeneralError}
          serverError={serverError}
          cleanErrors={cleanErrors}
        />
      </main>
    </>
    );
}

export default Movies;