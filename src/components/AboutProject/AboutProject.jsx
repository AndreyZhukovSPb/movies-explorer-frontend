import React from 'react';
import cn from 'classnames';  
import './AboutProject.css';
import SectionLine from '../SectionLine/SectionLine';
import SectionTitle from '../SectionTitle/SectionTitle';

const AboutProject = props => {
  const { className } = props;
  return (
    <section className={cn("aboutProject", className)} id="AboutProject">
      <SectionTitle
        title = 'О проекте'
      />
      <SectionLine/>  
      <div className="aboutProject__table">
        <p className="aboutProject__subtitle">Дипломный проект включал 5 этапов</p>
        <p className="aboutProject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className="aboutProject__subtitle">На выполнение диплома ушло 5 недель</p>
        <p className="aboutProject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="aboutProject__timeTable">
        <div className="aboutProject__timeTableCell">1 неделя</div>
        <div className="aboutProject__timeTableCell">4 недели</div>
        <div className="aboutProject__timeTableCell">Back-end</div>
        <div className="aboutProject__timeTableCell">Front-end</div>
      </div>

    </section>
  )
}

export default AboutProject;