import React from 'react';
import './FilterCheckbox.css'
import { useMediaQuery } from 'react-responsive';

const FilterCheckbox = props => {
  const { onChange, isCheked, onScreenSize, isSavedMovies } = props;
  const isTablet = useMediaQuery({ query: `(max-width: 1279px)` });
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });

  function handleOnCkickCheckBox() {
    onChange();
    if (!isSavedMovies) {
      onScreenSize(isTablet, isMobile);
    }
  }

  return (
    <section className="filterCheckbox">
      <label>
        <input type="checkbox" className="filterCheckbox__invisibleCB" onChange={handleOnCkickCheckBox} checked={!isCheked}/>
        <span className="filterCheckbox__visibleCB"></span>
      </label> 
    </section>
    
    );
}

export default FilterCheckbox;