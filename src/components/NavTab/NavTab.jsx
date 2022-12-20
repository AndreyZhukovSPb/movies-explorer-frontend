import React from 'react'; 
import './NavTab.css'

const NavTab = props => {
  return (
    <nav className="navTab">
      <a className="navTab__button" href="#AboutProject">О пректе</a>
      <a className="navTab__button" href="#Techs">Технологии</a>
      <a className="navTab__button" href="#AboutMe">Cтудент</a>
    </nav>
  )
}

export default NavTab;