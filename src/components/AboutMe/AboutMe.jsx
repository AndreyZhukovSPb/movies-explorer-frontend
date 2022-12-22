import React from 'react';
import cn from 'classnames';
import studentFoto from '../../images/student.svg'
import './AboutMe.css';
import SectionLine from '../SectionLine/SectionLine';
import SectionTitle from '../SectionTitle/SectionTitle';

const AboutMe = props => {
  const { className } = props;
  return (
    <section className={cn("aboutMe", className )}id="AboutMe">
      <SectionTitle
        title = 'Студент'
      />
      <SectionLine/>  
      <div className="aboutMe__container">
        <div className="aboutMe__info">
          <h2 className="aboutMe__name">Андрей</h2>
          <p className="aboutMe__legend">Фронтенд-разработчик, 38 лет</p>
          <p className="aboutMe__legend">Здесь я красиво напишу о себе когда доделаю основной фунционал а проекта а пока просто проверю как выглядит несколько строчек текста</p>
          <a href="https://github.com/AndreyZhukovSPb" target="_blank" className="aboutMe__link" rel="noreferrer">Github</a>
        </div>
        <img src={studentFoto} alt="фото студента" className="aboutMe__foto"/>
      </div>
    </section>
  )
}

export default AboutMe;

