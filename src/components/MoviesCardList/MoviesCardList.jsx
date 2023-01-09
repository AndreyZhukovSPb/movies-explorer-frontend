import React from 'react';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const MoviesCardList = props => {
  const { serverError, searchGeneralError, searchError, isSavedMovies, movies, onMovieLikeClick, onAddClick, onScreenSize, itemsToShow, queryToAdd, delMovie } = props;
  const [isMovieAdderIsVisible, setIsMovieAdderIsVisible] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  const isTablet = useMediaQuery({ query: `(max-width: 1279px)` });
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });

  useEffect(()=>{
    if (!isSavedMovies) {
      onScreenSize(isTablet, isMobile)
    } 
  }, [isTablet, isMobile])

  useEffect(()=>{
    if (!isSavedMovies) {
      if (movies.length > itemsToShow) {
        setIsMovieAdderIsVisible(true);
      } else {
        setIsMovieAdderIsVisible(false);
      }
    }
    }, [movies, itemsToShow])  
      
  function addMovies () {
    onAddClick(itemsToShow+queryToAdd,queryToAdd);
  }

  return (
    <>
      <section className={`moviesCardList ${movies.length === 0 ? 'moviesCardList_invisible' : '' }`}>
        {movies.slice(0, itemsToShow).map((movie) => (  
          <div key={movie.movieId}>
            <MoviesCard 
              title={movie.nameRU}
              src={movie.image}
              alt={movie.nameRU}
              movieOwnerId={movie.owner}
              duration = {movie.duration}
              movieId = {movie.movieId}
              userId = {currentUser._id}
              onMovieLikeClick = {onMovieLikeClick}
              onMovieDelClick = {delMovie}
              isSavedMovies = {isSavedMovies}
              movie = {movie}
              trailer = {movie.trailerLink}
            />
          </div>
      ))}
      </section>  
      <span className="moviesCardList__searchError">{searchError}</span>
      <span className="moviesCardList__searchError">{searchGeneralError}</span>
      <span className="moviesCardList__searchError">{serverError}</span>
      <section className="moviesCardListAdder">
        <button 
          type="button" 
          className={`moviesCardListAdder__container ${!isSavedMovies && isMovieAdderIsVisible ? 'moviesCardListAdder__container_visible' : ''}`} 
          onClick={ addMovies }
        >
          <p className="moviesCardListAdder__text">Ещё</p>
        </button>
      </section>

    </>
    );
}

export default MoviesCardList;


/* 

// useEffect(() =>{
  //  if (movies.length <= itemsToShow) {
  //    console.log('enougth')
  //    setIsMovieAdderIsVisible(false);
  // }}, [itemsToShow, queryToAdd])

// const [itemsToShow, setItemsToShow] = React.useState(12);
  // const [queryToAdd, setQueryToAdd] = React.useState(3);

  useEffect(()=>{
    if (isTablet && !isMobile) {
      console.log('tablet')
      console.log(isMobile)
      setItemsToShow(8)
      setQueryToAdd(2)
      onAddClick()
    } else if (isMobile) {
      console.log('mobile')
      setItemsToShow(5)
      setQueryToAdd(2)
    } else {
      console.log('desktop')
      setItemsToShow(12)
      setQueryToAdd(3)
    }
  }, [isTablet, isMobile])  

function addMovies () {
    // setItemsToShow(itemsToShow+queryToAdd)
    onScreenSize(itemsToShow+queryToAdd,queryToAdd);
    // if (movies.length < (itemsToShow+queryToAdd)) {
    //  console.log('enougth')
    //   setIsMovieAdderIsVisible(false);
    // }
  }

{state.moviesList.slice(0, state.itemsToShow).map((movie) => (

 <section className={`moviesCardList ${state.length === 0 ? 'moviesCardList_invisible' : '' }`}>
        {state.map((movie) => (
          <div key={movie.id}>
            <MoviesCard 
              title={movie.nameRU}
              src={`https://api.nomoreparties.co${movie.image.url}`}
              alt={movie.nameRU}
              movieOwnerId={movie.owner}
              duration = {movie.duration}
              id = {movie.id}
              userId = 'me'
              onMovieLikeClick = {onMovieLikeClick}
              isSavedMovies = {isSavedMovies}
            />
          </div>
      ))}
      </section>  
      <section className="moviesCardListAdder">
        <button type="button" className={`moviesCardListAdder__container ${movieAdderIsVisible ? 'moviesCardListAdder__container_visible' : ''}`} onClick={addMovies}>
          <p className="moviesCardListAdder__text">Ещё</p>
        </button>
      </section>

*/