import React from 'react';
import cn from 'classnames';
import NavTab from '../NavTab/NavTab';
import './Promo.css'

const Promo = props => {
  const { className } = props;
  return (
    <>
      <section className={cn("promo", className)}>
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <NavTab/>
      </section>
    </>
  )
}

export default Promo;