import React from 'react';
import './InfoToolTip.css';

const InfoTooltip = props => {
  const { message, type, onClose, isOpen} = props;

  return (
    <div className={`infoToolTip ${isOpen ? "infoToolTip_opened" : ''}`} >  
      <div className="infoToolTip__container">
        <button 
          aria-label="Close" 
          type="button" 
          className="infoToolTip__close-button"
          onClick={onClose}
        >
        </button>
        <div className={`infoToolTip__sign infoToolTip__sign_type_${type}`} ></div>
        <p className='infoToolTip__text'>{message}</p>
        
      </div>
    </div>
  )

}

export default InfoTooltip;