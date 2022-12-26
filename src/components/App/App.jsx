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
import * as auth from '../../utils/auth';
import MainApi from '../../utils/MainApi'
import ProtectedRoute from '../ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
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
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);

  useEffect(()=>{
    if (!localStorage.getItem('jwt')) return;
    const jwt = localStorage.getItem('jwt');
    auth.checkToken(jwt)
      .then(data => {
        if(!data) {
          return Promise.reject ('No data');
        } 
        setCurrentUser(data);
        setIsLoggedIn(true);
        // history.push('/saved-movies');
      })
      .catch(err=>{
        console.log(err)
      });
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
    setIsPreloaderOpen(true);
    auth.signUp(name, email, password)
      .then((data) => {
        if(!data._id) {
          handleErrorPopup();
          return Promise.reject ('No data');
        } else {
          return (data);
        } 
      })
      // .then((data) => {
      //  handleLogin(email, password)
      // })
      .then(() => {
        handleConfirmReqPopup();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsPreloaderOpen(false);
      })
  }

  function handleLogin(email, password) {
    setIsPreloaderOpen(true);
    console.log(email, password)
    auth.singIn(email, password)
      .then(res =>{
        if (res.data) {
          console.log(res.data)
          localStorage.setItem('jwt', res.data);
          MainApi.setToken(res.data);
          setIsLoggedIn(true);
          history.push('/movies');
        } else {
          handleErrorPopup();
          return;
        }
      })
      .catch(err =>{
        console.log(err);
      })
      .finally(() => {
        setIsPreloaderOpen(false);
      })
  }

  function handleGoBack() {
    history.push('/');
  }

  function handleConfirmReqPopupClose() {
    closeAllPopups();
    setIsLoggedIn(true);
    history.push('/movies')
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

  function handleErrorPopup(){
    setIsErrorPopupOpen(true);
  };

  function handleConfirmReqPopup() {
    setIsConfirmReqPopupOpen(true);
  }

  function handleConfirmChangePopup() {
    setIsConfirmChangePopupOpen(true);
  }

  function handleExitProfile() {
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setIsLoggedIn(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path='/'>
            <Main
              isLoggedIn = {false}
              className = "app__main"
              onNavMenuClick = {handleNavClickMovies}
            />
            <Footer/>
          </Route>

          <ProtectedRoute exact path='/movies' isLoggedIn={isLoggedIn}>
            <Movies
              className = "app__movies"
              isLoggedIn = {isLoggedIn}
              onSubmit = {hanldeSearch}
              movies = {moviesList}
              onMovieLikeClick = {hanldeMovieLikeClick}
              onAddClick = {handleOnAddClick}
              movieAdderIsVisible = {IsAdderNecessary}
              onNavMenuClick = {handleNavClickMovies}
            />
            <Footer/>
          </ProtectedRoute>  

          <ProtectedRoute exact path='/saved-movies' isLoggedIn={isLoggedIn}>
            <SavedMovies
              className = "app__savedMovies"
              isLoggedIn = {isLoggedIn}
              onSubmit = {hanldeSearchSaved}
              favoriteMovies = {favoriteMoviesList}
              onMovieLikeClick = {hanldeMovieLikeClick}
              movieAdderIsVisible = {false}
              onNavMenuClick = {handleNavClickSavedMovies}
            />
            <Footer/>
          </ProtectedRoute>  

          <ProtectedRoute exact path='/profile' isLoggedIn={isLoggedIn}>
            <Profile
              isLoggedIn = {isLoggedIn}
              currentUser = {currentUser}
              onProfile = {handleProfile}
              onNavMenuClick = {handleNavClick}
              onExitProfile = {handleExitProfile}
            />   
          </ProtectedRoute> 

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

        <Preloader
          isOpen = {isPreloaderOpen}
        />
        
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

/* 
        потом:         
        - валидация форм + дизейбл submit + span ошибок: UseForm
        - валидация searchForm смотри бриф
        - ошибки Api передавать юзеру
        - написать кнопку еще
        - прелоадер
        - трейлер

        доделки
        - сделать резиновую верстку на промежуточных разрешениях
        - в auth.checkToken надо делать хистори пуш?
        - как включить баттон или текст в инпут чтобы фокус хорошо выглядел
        - написать нормальный текст о себе
        - дописать readme
*/
