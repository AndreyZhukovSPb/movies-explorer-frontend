import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'
import ProfileButton from '../ProfileButton/ProfileButton';
      
const Navigation = props => {
  const { isLoggedIn, onNavMenuClick } = props;
  return (
    <div className="navigation">
      <nav>
        <div className={`navigation__container ${!isLoggedIn ? 'navigation__container_visible' : ''}`}>
          <div></div>
          <Link to={'/sign-up'} className="navigation__link">Регистрация</Link>
          <Link to={'/sign-in'}>
            <button name="NavigationSignIn" className="navigation__button" type='button'>Войти</button>
          </Link>
        </div>
        
        <div className={`navigation__container ${isLoggedIn ? 'navigation__container_visible' : ''}`}>
          <div className="navigation__linkContainer">
            <Link to={'/movies'} className="navigation__link">Фильмы</Link>
            <Link to={'/saved-movies'} className="navigation__link">Сохраненные фильмы</Link>  
          </div>  

        <ProfileButton/>
        </div>
        
      </nav>
      <button onClick={onNavMenuClick} type='button' className={`navigation__menu ${isLoggedIn ? 'navigation__menu_visible' : ''}`}></button>
    </div>
  )
}
      
export default Navigation;

/* 
<div className={`navigation__linkContainer ${!isLoggedIn ? 'navigation__linkContainer_visible' : ''}`}>
          <Link to={'/sign-up'} className={`navigation__link ${!isLoggedIn ? 'navigation__link_visible' : ''}`}>Регистрация</Link>
          <Link to={'/sign-in'}>
            <button name="NavigationSignIn" className={`navigation__button ${!isLoggedIn ? 'navigation__button_visible' : ''}`} type='button'>Войти</button>
          </Link>
        </div>
        
        <Link to={'/movies'} className={`navigation__link ${isLoggedIn ? 'navigation__link_visible' : ''}`}>Фильмы</Link>
        <Link to={'/saved-movies'} className={`navigation__link ${isLoggedIn ? 'navigation__link_visible' : ''}`}>Сохраненные фильмы</Link>
        <Link to={'/profile'}>
          <button name="NavigationProfile" className={`navigation__profile ${isLoggedIn ? 'navigation__profile_visible' : ''}`} type='button' >
            <img src={profileIcon} className="navigation__icon" alt="профиль" />
            Аккаунт
          </button>
        </Link>
      </nav>
      <button onClick={onNavMenuClick} type='button' className={`navigation__menu ${isLoggedIn ? 'navigation__menu_visible' : ''}`}></button>
      */