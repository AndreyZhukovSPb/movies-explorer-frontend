import React from 'react';
import cn from 'classnames';
import './Portfolio.css'

const Portfolio = props => {
  const { className } = props;
  return (
    <section className={cn("portfolio", className)}>
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__container">
      <li className="portfolio__part">
          <h2 className="portfolio__name">Статичный сайт</h2>
          <a href="https://github.com/AndreyZhukovSPb/how-to-learn" target="_blank" className="portfolio__link" rel="noreferrer">
            <div className="portfolio__arrow"></div>
          </a>
      </li>
      <li className="portfolio__part">
          <h2 className="portfolio__name">Адаптивный сайт</h2>
          <a href="https://andreyzhukovspb.github.io/russian-travel/index.html" target="_blank" className="portfolio__link" rel="noreferrer">
            <div className="portfolio__arrow"></div>
          </a>
      </li>
      <li className="portfolio__part">
          <h2 className="portfolio__name">Одностраничное приложение</h2>
          <a href="https://pioneer.students.nomoredomains.icu/sing-up" target="_blank" className="portfolio__link" rel="noreferrer">
            <div className="portfolio__arrow"></div>
          </a>
      </li>
      </ul>
    </section>
  )
}

export default Portfolio;