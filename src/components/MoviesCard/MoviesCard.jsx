import React from 'react';
import './MoviesCard.css';

const MoviesCard = props => {
  const { isSavedMovies, title, src, alt, movieOwnerId, duration, id, userId, onMovieLikeClick } = props;

  function handleLikeClick() {
    onMovieLikeClick(props)
  }
  
  return (
    <section className="moviesCard">
      <div className="moviesCard__container">
        <div className="moviesCard__infoContainer">
          <h3 className="moviesCard__title">{title}</h3>
          <p className="moviesCard__duration">
            { duration>=60 ? `${Math.floor(duration/60)}ч ${duration % 60}м` : `${duration}м` }
          </p>
        </div>
        <div onClick={handleLikeClick} className={`moviesCard__likeContainer ${isSavedMovies ? 'moviesCard__likeContainer_type_saved' : movieOwnerId === userId ? 'moviesCard__likeContainer_type_active' : ''}`}>
          <button className={`moviesCard__likeButton ${isSavedMovies ? 'moviesCard__likeButton_type_saved' : movieOwnerId === userId ? 'moviesCard__likeButton_type_active' : ''}`}>
          </button>
        </div>        
      </div>
      <img src={src} alt={alt} className="moviesCard__image" />

    </section>    
      
    
    );
}

export default MoviesCard;