import React from 'react';
import './PopupWithMenu.css';
import { Link } from 'react-router-dom';
import ProfileButton from '../ProfileButton/ProfileButton';

const PopupWithMenu = props => {
  const { onClose, isOpen, currentPage } = props;

  return (
    <div className={`popupWithMenu ${isOpen ? "popupWithMenu_opened" : ''}`} >  
      <div className="popupWithMenu__container">
        <button 
          aria-label="Close" 
          type="button" 
          className="popupWithMenu__close-button"
          onClick={onClose}
        >
        </button>
        <Link className="popupWithMenu__link" to={'/'} onClick={onClose}>Главная</Link>
        <Link className={`popupWithMenu__link ${currentPage === 'movies' ? 'popupWithMenu__link_underline' : ''}`} to={'/movies'} onClick={onClose}>Фильмы</Link>
        <Link className={`popupWithMenu__link ${currentPage === 'saved-movies' ? 'popupWithMenu__link_underline' : ''}`} to={'/saved-movies'} onClick={onClose}>Сохраненные фильмы</Link>
        <ProfileButton
          onClose={onClose}
        />
      </div>
    </div>
  )

}

export default PopupWithMenu;


