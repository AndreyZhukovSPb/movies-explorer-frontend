import React from 'react';
import cn from 'classnames';
import { useEffect } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'


const SavedMovies = props => {
  const { serverError, showSavedMovies, setLastValue, hideSearchError, itemsToShow, isCheked, delMovie, onCheckBoxClick, getSavedMovies, isLoggedIn, onSubmit, favoriteMovies, onMovieLikeClick, className, onNavMenuClick, searchError } = props;

  useEffect(()=>{
    getSavedMovies();
  }, [])

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
          onCheckBoxClick = {onCheckBoxClick}
          isSavedMovies = {true}
          showSavedMovies = {showSavedMovies}
          isCheked = {isCheked}
          hideSearchError = {hideSearchError}
          setLastValue = {setLastValue}
        />
        <MoviesCardList
          movies = {favoriteMovies}
          onMovieLikeClick = {onMovieLikeClick}
          isSavedMovies = {true}
          delMovie = {delMovie}
          itemsToShow = {itemsToShow}
          searchError= {searchError}
          serverError={serverError}
        />
      </main>
    </>
    );
}

export default SavedMovies;