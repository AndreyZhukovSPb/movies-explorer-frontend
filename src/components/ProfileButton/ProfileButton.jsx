import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileButton.css'

import profileIcon from '../../images/icon-human-new.svg'

const ProfileButton = props => {
  const { onClose } = props;
  
  return (
    <Link to={'/profile'}>
      <button name="NavigationProfile" className="profileButtton" type='button' onClick={onClose}>
        <img src={profileIcon} className="profileButtton__icon" alt="профиль" />
        Аккаунт
        </button>
    </Link>
  )
}
      
export default ProfileButton;