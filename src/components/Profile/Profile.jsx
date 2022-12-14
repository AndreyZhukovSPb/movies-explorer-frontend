import React from 'react';  
import { useForm } from 'react-hook-form'
import './Profile.css';
import Header from '../Header/Header'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Profile = props => {

  const { isLoggedIn, currentUser, onProfile, onNavMenuClick, onExitProfile } = props;
  
  const [isDataNew, setIsDataNew] = React.useState(false);
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
    watch
  } = useForm({
    defaultValues: {profileName: currentUser.name, profileEmail: currentUser.email},
    mode: "all" // "onChange"
  });
  
  useEffect(()=>{
    const compare = watch((data) => {
      if (data.profileName === data.name && data.profileEmail === data.email) {
        setIsDataNew(false)
      } else {
        setIsDataNew(true)
      }
    })
  },[watch])


  useEffect(() => {
    reset(currentUser);
  }, [currentUser]);

  const onSubmit = (data) => {  
    onProfile(data.profileName, data.profileEmail);
    reset(currentUser);
  }

  function test() {
    console.log(isValid)
  }

  return (
    <>
      <Header
        isLoggedIn = {isLoggedIn}
        className = "profile__header"
        onNavMenuClick = {onNavMenuClick}
      />
      <section className="profile">
        <h2 className="profile__title" onClick={test}>Привет, {currentUser.name}</h2>
        <form id="profileForm" name="profileForm" className="profile__form" onSubmit={handleSubmit(onSubmit)}>
          <label className="profile__inputTitle">
            Имя
            <input 
              {... register("profileName", {
                required: {
                  value: true,
                  message: "Поле Имя обязательно к заполнению"}
              })}
              type="text" 
              // placeholder={currentUser.name} 
              className="profile__input" 
            />
            
          </label>
          <label className="profile__inputTitle" >E-mail  
            <input 
              {... register("profileEmail", {
                required: "Поле Email обязательно к заполнению",
                pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Некорректный адрес электронной почты"
                }
              })}
              type="email" 
              placeholder={currentUser.email} 
              className="profile__input" 
            />
          </label>
          
          {errors.profileName && <span className="profile__error">{errors?.profileName?.message || "Другая ошибка"}</span>}
          {errors.profileEmail && <span className="profile__error">{errors?.profileEmail?.message || "Другая ошибка"}</span>}
          <div className="profile__buttonBox">
            <button disabled={!isValid || !isDataNew || !isDirty} type="submit" className="profile__button">Редактировать</button>
            <Link onClick={onExitProfile} to={'./'} className="profile__link">Выйти из аккаунта</Link>
          </div>
        </form>
        
      
      </section>
    </>
  )
}

export default Profile;

/*
<button disabled={!isValid || !isDirty} type="submit" className="profile__button">Редактировать</button>

onChange={handleChange}

// <span> {errors.profileName ? errors.profileName.message : ''} </span> 
<>
      <Header
        isLoggedIn = {isLoggedIn}
        className = "profile__header"
        onNavMenuClick = {onNavMenuClick}
      />
      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}</h2>
        <form id="profileForm" name="profileForm" className="profile__form" onSubmit={handleSubmit(onSubmit)}>
          <label className="profile__inputTitle">
            Имя
            <input 
              type="text" 
              name="profileName" 
              placeholder={currentUser.name} 
              className="profile__input" 
              onChange={handleChange}
              required
            />
          </label>
          <label className="profile__inputTitle" >E-mail  
            <input 
              type="email" 
              name="profileEmail" 
              placeholder={currentUser.email} 
              className="profile__input" 
              onChange={handleChange}
              required
            />
          </label>
          <div className="profile__buttonBox">
            <button type="submit" className="profile__button">Редактировать</button>
            <Link onClick={onExitProfile} to={'./'} className="profile__link">Выйти из аккаунта</Link>
          </div>
        </form>
      
      </section>
    </>
*/