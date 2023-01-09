import React from 'react';
import { useMediaQuery } from 'react-responsive';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

const SearchForm = props => {
  const { setLastValue, hideSearchGeneralError, hideSearchError, showSavedMovies, isSavedMovies, onSubmit, onCheckBoxClick, isCheked, onScreenSize, previousValue } = props;

  const [searchInputValue, setSearchInputValue] = React.useState('');
  const [isInputError, setIsInputError] = React.useState(false);

  const isTablet = useMediaQuery({ query: `(max-width: 1279px)` });
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });

  function handleSubmit (e) {
    e.preventDefault();
    if (searchInputValue !== '') {
      onSubmit(searchInputValue);
      if (!isSavedMovies) {
        onScreenSize(isTablet, isMobile);
      }
    } else {
      setIsInputError(true)
    }
  }

  function handleChange (e) {
    setSearchInputValue(e.target.value);
    if (isSavedMovies) {
      setLastValue(e.target.value)
    } 
    if (e.target.value !== '') {
      setIsInputError(false);
      } 
    if (isSavedMovies && e.target.value === '') {
      showSavedMovies();
      hideSearchError();   
    } else if (!isSavedMovies && e.target.value === '') {
      hideSearchGeneralError()
    }
  } 

  return (
    <section className="searchForm">
      <div className="searchForm__container">
        <form id="moviesSearch" name="moviesSearch" className="searchForm__form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="searchForm__input"
            id="searchFormInput"
            placeholder="Фильм"
            defaultValue={previousValue}
            onChange={handleChange}
          />
          <button 
            type="submit" 
            className="searchForm__button"
          >
            Поиск
          </button>
        </form>
        {isInputError && <span className="searchForm__error">{'Нужно ввести ключевое слово'}</span>}
        <FilterCheckbox
          onChange = {onCheckBoxClick}
          isCheked = {isCheked}
          onScreenSize={onScreenSize}
          isSavedMovies={isSavedMovies}
        />
      </div>
      
    </section>
    );
}

export default SearchForm;

// {errors.searchFormInput && <span className="searchForm__error">{errors.searchFormInput.message}</span>}