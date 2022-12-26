import React from 'react';  
import cn from 'classnames';
import Header from '../Header/Header'
import Promo from '../Promo/Promo'
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs'
import AboutMe from '../AboutMe/AboutMe'
import Portfolio from '../Portfolio/Portfolio'
import './Main.css';


const Main = props => {
  const { isLoggedIn, className, onNavMenuClick } = props;
  return (
    <>
      <Header
        isLoggedIn = {isLoggedIn}
        className = "main__header"
        onNavMenuClick = {onNavMenuClick}
      />
      <main className={cn("main", className)}>   
        <Promo
          className = "main__promo"
        />
        <AboutProject
          className = "main__aboutProject"
        />
        <Techs
          className = "main__techs"
        />
        <AboutMe
          className = "main__aboutMe"
        />
        <Portfolio
          className = "main__portfolio"
        />        
      </main>
    </>
  )
}

export default Main;