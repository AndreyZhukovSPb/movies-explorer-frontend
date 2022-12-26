import React from 'react';
import './SectionLine.css'

const SectionLine = props => {

const { isTechs } =   props;
  return (
    <div className={`sectionLine ${isTechs ? 'sectionLine_type_techs' : ''}`}></div>
  )
}

export default SectionLine;