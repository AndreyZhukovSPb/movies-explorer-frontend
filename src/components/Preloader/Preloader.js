import React from 'react'
import './Preloader.css'

const Preloader = (props) => {

const { isOpen } = props;

    return (
        <div className={`preloader ${isOpen ? 'preloader_opened' : ''}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader;
