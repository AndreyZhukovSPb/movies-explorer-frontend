import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

const SearchForm = props => {
  const { onSubmit } = props;

  const [searchInputValue, setSearchInputValue] = React.useState('');
  
  function handleSubmit (e) {
    e.preventDefault();
    onSubmit(searchInputValue);
  }

  function handleChange (e) {
    setSearchInputValue(e.target.value);
  }

  return (
    <section className="searchForm">
      <div className="searchForm__container">
        <form id="moviesSearch" name="moviesSearch" className="searchForm__form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            required
            className="searchForm__input"
            name="searchFormInput"
            id="searchFormInput"
            placeholder="Фильм"
            onChange={handleChange}
          />
          <button 
            type="submit" 
            className="searchForm__button"
          >
            Поиск
          </button>
        </form>
        <FilterCheckbox/>
      </div>
      
    </section>
    );
}

export default SearchForm;