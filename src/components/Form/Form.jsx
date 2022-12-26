import React from 'react';  
import './Form.css';
import headerLogo from '../../images/logo__new.svg';
import { Link } from 'react-router-dom';

const Form = props => {
  const { name, FormTitle, FormButtonText, FormText, FormLinkText, FormLinkPath, onSubmit, isRegForm } = props;

  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  
  function handleSubmit (e) {
    e.preventDefault();
    const {name, email, password} = state;
    if (name !== '') {
      onSubmit(name, email, password);
    } else {
      onSubmit(email, password);
    }
  }

  function handleChange (e) {
    const {name, value} = e.target;
    setState(old => ({
      ...old,
      [name]: value
      })
    );
  }

  return (
    <section className="formContainer">
      <form id={name} name={name} className="form" onSubmit={handleSubmit} >
        <Link to={'/'}>
          <img src={headerLogo} className={`form__logo ${isRegForm ? 'form__logo_reg' : ''}`} alt="лого" />
        </Link>
        <h2 className="form__title">{FormTitle}</h2>
        <label className={`form__inputLabel ${!isRegForm ? 'form__inputLabel_hidden' : ''}`}>
          Имя
          <input 
            type="text" 
            className={`form__input ${!isRegForm ? 'form__input_hidden' : ''}`}
            onChange={handleChange}
            name="name"
            required = {isRegForm}
          />
        </label>
        <label className="form__inputLabel">
          E-mail
          <input 
            type="email" 
            className="form__input"
            onChange={handleChange}
            name="email"
            required
          />
        </label>  
        <label className="form__inputLabel">
          Пароль
          <input 
            type="password" 
            className="form__input"
            onChange={handleChange}
            name="password"
            required
          />
        </label>
        <div className={`form__actionContainer ${isRegForm ? 'form__actionContainer_type_reg' : ''}`}>
          <button type="submit" className="form__button">{FormButtonText}</button>
          <p className="form__alternative">
            {FormText}
            <a className="form__link" href={FormLinkPath}>{FormLinkText}</a>
          </p>
        </div>        
      </form>
    </section>
  )
}  

export default Form;