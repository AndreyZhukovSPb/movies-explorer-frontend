import React from 'react';
import './FilterCheckbox.css'

const FilterCheckbox = props => {

function handleClick() {
  console.log('в третьей части отправлю наверх')
}

  return (
    <div className="filterCheckbox">
      <label>
        <input type="checkbox" className="filterCheckbox__invisibleCB" onChange={handleClick}/>
        <span className="filterCheckbox__visibleCB"></span>
      </label> 
    </div>
    
    );
}

export default FilterCheckbox;