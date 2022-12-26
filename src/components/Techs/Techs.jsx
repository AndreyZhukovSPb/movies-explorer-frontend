import React from 'react';  
import cn from 'classnames';
import './Techs.css'
import SectionLine from '../SectionLine/SectionLine';
import SectionTitle from '../SectionTitle/SectionTitle';

const Techs = props => {
  const { className } = props;
  return (
    <section className={cn("techs", className)} id="Techs">
      <SectionTitle
        title = 'Технологии'
      />
      <SectionLine
        isTechs = {true}
      />  
      <h2 className="techs__subtitle">7 технологий</h2>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__table">
        <li className='techs__tableCell'>HTML</li>
        <li className='techs__tableCell'>CSS</li>
        <li className='techs__tableCell'>JS</li>
        <li className='techs__tableCell'>React</li>
        <li className='techs__tableCell'>Git</li>
        <li className='techs__tableCell'>Express.js</li>
        <li className='techs__tableCell'>mongoDB</li>
      </ul>
    </section>
  )
}

export default Techs;