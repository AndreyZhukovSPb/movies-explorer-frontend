import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/logo__new.svg';
import Navigation from '../Navigation/Navigation';
import cn from 'classnames';
import './Header.css'

const Header = props => {
  const { isLoggedIn, className, onNavMenuClick } = props;

  return (
    <header className={cn("header", className)}>
      <Link to={'/'}>
        <img className="header__logo" src={headerLogo} alt="лого" />
      </Link>
      
      <Navigation
        isLoggedIn={isLoggedIn}
        onNavMenuClick={onNavMenuClick}
      />
    </header>
  );
}

export default Header;
