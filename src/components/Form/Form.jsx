import React from 'react';  
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import './Form.css';
import headerLogo from '../../images/logo__new.svg';
import { Link } from 'react-router-dom';


const Form = props => {
  const { name, FormTitle, FormButtonText, FormText, FormLinkText, FormLinkPath, onSubmit, isRegForm, cleanErrorMessage, registerErrorMessage, loginErrorMessage } = props;

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all" // "onChange"
  });

  const onSubmitForm = (data) => {
    if (data.name) {
      onSubmit(data.name, data.email, data.password);
      cleanErrorMessage()
    } else {
      cleanErrorMessage()
      onSubmit(data.email, data.password);
    }
  }

  return (
    <section className="formContainer">
      <form id={name} name={name} className="form" onSubmit={handleSubmit(onSubmitForm)} >
        <Link to={'/'}>
          <img src={headerLogo} className={`form__logo ${isRegForm ? 'form__logo_reg' : ''}`} alt="лого" />
        </Link>
        <h2 className="form__title">{FormTitle}</h2>
        <label className={`form__inputLabel ${!isRegForm ? 'form__inputLabel_hidden' : ''}`}>
          Имя
          <input 
            {... register("name", {
              required: {
                value: isRegForm,
                message: "Поле Имя обязательно к заполнению"},
              pattern: {
                value: /^[öa-zA-Zа-яА-ЯёЁ -\s]+$/,
                message: "Имя может содержать буквы, дефис и пробел"
                }
            })}
            type="text" 
            className={`form__input ${!isRegForm ? 'form__input_hidden' : ''}`}
            name="name"
            required = {isRegForm}
          />
          {errors.name && <span className="form__inputError">{errors.name.message}</span>}
        </label>
        <label className="form__inputLabel">
          E-mail
          <input 
            {... register("email", {
              required: {
                value: true,
                message: "Поле Email обязательно к заполнению"},
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Некорректный адрес электронной почты"
                }
            })}
            type="email" 
            className="form__input"
            required
          />
          {errors.email && <span className="form__inputError">{errors.email.message}</span>}
        </label>  
        <label className="form__inputLabel">
          Пароль
          <input 
            {... register("password", {
              required: {
                value: true,
                message: "Пароль не может бытть пустым"},
            })}
            type="password" 
            className="form__input"
          />
          
          {errors.password && <span className="form__inputError">{errors.password.message}</span>}
        </label>
        
        
        <div className={`form__actionContainer ${isRegForm ? 'form__actionContainer_type_reg' : ''}`}>
        <span className='form__error'>{registerErrorMessage}</span>
        <span className='form__error'>{loginErrorMessage}</span>
          <button disabled={!isValid} type="submit" className="form__button">{FormButtonText}</button>
          <p className="form__alternative">
            {FormText}
            <a className="form__link" href={FormLinkPath} onClick={cleanErrorMessage}>{FormLinkText}</a>
          </p>
        </div>        
      </form>
    </section>
  )
}  

export default Form;



/* 
const { name, FormTitle, FormButtonText, FormText, FormLinkText, FormLinkPath, onSubmit, isRegForm } = props;

  const {values, handleChange, errors, isValid, resetForm } = FormValidator();
  
  function handleSubmit (e) {
    e.preventDefault();
    const {name, email, password} = values;
    if (name !== '') {
      
      onSubmit(name, email, password);
    } else {
      onSubmit(email, password);
    }
  }

  /* 
  function handleChange (e) {
    const {name, value} = e.target;
    setValues(values => ({...values, [name]: value }));
    setErrors({...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
    
    
  }
  */

/*   function handleChange (e) {
    const {name, value} = e.target;
    setState(old => ({ ...old, [name]: value }));
  } */

/*
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
          <span className="form__inputError">{errors.name}</span>
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
          <span className="form__inputError">{errors.email}</span>
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
          <span className="form__inputError">{errors.password}</span>
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
}  */