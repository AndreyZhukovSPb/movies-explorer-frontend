import React from 'react';  
import './Profile.css';
import Header from '../Header/Header'
import { Link } from 'react-router-dom';

const Profile = props => {
  
  const { isLoggedIn, currentUser, onProfile, onNavMenuClick } = props;

  const [state, setState] = React.useState({
    profileName: '',
    profileEmail: '',
  });
  
  function handleSubmit (e) {
    e.preventDefault();
    const {profileName, profileEmail} = state;
    onProfile(profileName, profileEmail);
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
    <>
      <Header
        isLoggedIn = {isLoggedIn}
        className = "profile__header"
        onNavMenuClick = {onNavMenuClick}
      />
      <div className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}</h2>
        <form id="profileForm" name="profileForm" className="profile__form" onSubmit={handleSubmit}>
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
            <Link to={'./'} className="profile__link">Выйти из аккаунта</Link>
          </div>
        </form>
      
      </div>
    </>
  )
}

export default Profile;

/* <h3 className="profile__inputTitle">Имя</h3> */