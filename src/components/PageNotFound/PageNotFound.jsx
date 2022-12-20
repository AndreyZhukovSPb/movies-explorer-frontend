import React from 'react';  
import './PageNotFound.css';

const PageNotFound = props => {
  
  const { onClick } = props;

  return (
    <div className="pageNotFound">
      <h1 className="pageNotFound__title">404</h1>
      <p className="pageNotFound__subtitle">Страница не найдена</p>            
      <p className="pageNotFound__goBack" onClick={onClick}>Назад</p>    
  </div>
  )
}  

export default PageNotFound;