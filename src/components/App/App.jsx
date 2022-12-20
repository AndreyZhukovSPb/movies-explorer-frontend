import React from 'react';
import { useEffect } from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import '../../index.css';
import Register from '../Register/Register'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import Movies from '../Movies/Movies'
import Profile from '../Profile/Profile'
import { initialMovies,  initialFavoritesMovies} from '../../utils/constants'
import SavedMovies from '../SavedMovies/SavedMovies'
import Login from '../Login/Login'
import PageNotFound from '../PageNotFound/PageNotFound'
import Preloader from '../Preloader/Preloader'
import InfoTooltip from '../InfoToolTip/InfoToolTip';
import PopupWithMenu from '../PopupWithMenu/PopupWithMenu';

// import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const history = useHistory();
  const [moviesList, setMoviesList] = React.useState([])
  const [currentUser, setCurrentUser] = React.useState({});
  const [favoriteMoviesList, setFavoriteMoviesList] = React.useState([]);
  const [IsAdderNecessary, setIsAdderNecessary] = React.useState(true);
  const [isConfirmReqPopupOpen, setIsConfirmReqPopupOpen] = React.useState(false);
  const [isConfirmChangePopupOpen, setIsConfirmChangePopupOpen] = React.useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState(false);
  const [isPopupWithMenuOpen, setIsPopupWithMenuOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState('');

  useEffect(()=>{
    setCurrentUser({
      name: 'Андрей',
      email: 'Почта новорожденного'
    })
  }, [])

  useEffect(()=>{
    setFavoriteMoviesList(initialFavoritesMovies)
  }, [])

  useEffect(()=>{
    setMoviesList(initialMovies)
  }, [])

  /* 
  function handleLogin (email, password) {
    setIsLoggedIn(true);
    history.push('/sign-in');
  }
  */

  function hanldeSearch(value) {
    console.log (value)
  }

  function hanldeMovieLikeClick(value) {
    console.log(value);
  }

  function handleOnAddClick() {
    console.log('добавляем фильмы, обновляем стейт');
  }

  function hanldeSearchSaved(value) {
    console.log (value);
    console.log ('test in saved');
  }

  function handleProfile(name, email) {
    console.log(name, email);
    setIsConfirmChangePopupOpen(true);
  }

  function handleRegister(name, email, password) {
    console.log(name, email, password);
    setIsConfirmReqPopupOpen(true);
  }

  function handleLogin(email, password) {
    console.log(email, password)
  }

  function handleGoBack() {
    history.push('/');
  }

  function handleConfirmReqPopupClose() {
    closeAllPopups();
    history.push('sign-in')
  }

  function closeAllPopups(){
    setIsConfirmReqPopupOpen(false);
    setIsConfirmChangePopupOpen(false);
    setIsErrorPopupOpen(false);
    setIsPopupWithMenuOpen(false);
  }

  function handleNavClickMovies() {
    setCurrentPage('movies');
    setIsPopupWithMenuOpen(true);
  }

  function handleNavClickSavedMovies() {
    setCurrentPage('saved-movies');
    setIsPopupWithMenuOpen(true);
  }

  function handleNavClick(){
    setCurrentPage('');
    setIsPopupWithMenuOpen(true);
  }

  return (
    <div className="page">
      
      <Switch>
        <Route exact path='/'>
          <Main
            isLoggedIn = {false}
            className = "app__main"
          />
          <Footer/>
        </Route>

        <Route path='/movies'>
          <Movies
            className = "app__movies"
            isLoggedIn = {true}
            onSubmit = {hanldeSearch}
            movies = {moviesList}
            onMovieLikeClick = {hanldeMovieLikeClick}
            onAddClick = {handleOnAddClick}
            movieAdderIsVisible = {IsAdderNecessary}
            onNavMenuClick = {handleNavClickMovies}
          />
          <Footer/>
        </Route>

        <Route path='/saved-movies'>
          <SavedMovies
            className = "app__savedMovies"
            isLoggedIn = {true}
            onSubmit = {hanldeSearchSaved}
            favoriteMovies = {favoriteMoviesList}
            onMovieLikeClick = {hanldeMovieLikeClick}
            movieAdderIsVisible = {false}
            onNavMenuClick = {handleNavClickSavedMovies}
          />
          <Footer/>
        </Route>

        <Route path='/profile'>   
          <Profile
            isLoggedIn = {true}
            currentUser = {currentUser}
            onProfile = {handleProfile}
            onNavMenuClick = {handleNavClick}
          />   
        </Route>

        <Route path='/sign-up'>
          <Register
            onRegister = {handleRegister}
          />
        </Route>

        <Route path='/sign-in'>
          <Login
            onLogin = {handleLogin}
          />
        </Route>

        <Route path='/preloader'>
          <Preloader/>
        </Route>

        <Route path="">
          <PageNotFound
            onClick = {handleGoBack}
          />
        </Route>

      </Switch>

      <InfoTooltip
        isOpen={isConfirmReqPopupOpen}
        type={'good'}
        message={'Вы успешно зарегистрировались'}
        onClose={handleConfirmReqPopupClose}
      />

      <InfoTooltip
        isOpen={isConfirmChangePopupOpen}
        type={'good'}
        message={'Вы успешно обновили данные профиля'}
        onClose={closeAllPopups}
      />

      <InfoTooltip 
        isOpen={isErrorPopupOpen}
        type={'bad'}
        message={'Что-то пошло не так! Попробуйте ещё раз.'}
        onClose={closeAllPopups}
      />

      <PopupWithMenu
        isOpen={isPopupWithMenuOpen}
        onClose={closeAllPopups}
        currentPage={currentPage}
      />
      
    </div>
  );
}

export default App;

/* 

        <ProtectedRoute exact path='/' isLoggedIn={isLoggedIn}>
        потом:         
        - валидация форм + дизейбл submit + span ошибок: UseForm
        - написать кнопку еще
        - поправить баттон Аккаунт выравнивание
        - как включить баттон или текст в инпут чтобы фокус хорошо выглядел
        - написать нормальный текст о себе
        - дописать readme
*/
