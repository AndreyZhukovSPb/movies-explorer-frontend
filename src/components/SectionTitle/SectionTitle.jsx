import React from 'react';
import './SectionTitle.css'

const SectionTitle = props => {

const { title, isTechs } = props;  
  return (
    
    <h3 className="sectionTitle">{title}</h3>
  )
}

export default SectionTitle;