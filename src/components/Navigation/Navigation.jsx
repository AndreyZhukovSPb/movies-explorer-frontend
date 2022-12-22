import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'
import ProfileButton from '../ProfileButton/ProfileButton';
      
const Navigation = props => {
  const { isLoggedIn, onNavMenuClick } = props;
  return (
    <section className="navigation">
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
    </section>
  )
}
      
export default Navigation;
