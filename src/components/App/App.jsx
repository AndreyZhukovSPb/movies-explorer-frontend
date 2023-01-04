import React from 'react';
import { useEffect } from 'react';
import { useHistory, Route, Switch, useLocation } from 'react-router-dom';
import '../../index.css';
import Register from '../Register/Register'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import Movies from '../Movies/Movies'
import Profile from '../Profile/Profile'
import SavedMovies from '../SavedMovies/SavedMovies'
import Login from '../Login/Login'
import PageNotFound from '../PageNotFound/PageNotFound'
import Preloader from '../Preloader/Preloader'
import InfoTooltip from '../InfoToolTip/InfoToolTip';
import PopupWithMenu from '../PopupWithMenu/PopupWithMenu';
import * as auth from '../../utils/auth';
import MainApi from '../../utils/MainApi'
import MoviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const history = useHistory();
  const [moviesList, setMoviesList] = React.useState([])
  const [currentUser, setCurrentUser] = React.useState({});
  const [isConfirmReqPopupOpen, setIsConfirmReqPopupOpen] = React.useState(false);
  const [isConfirmChangePopupOpen, setIsConfirmChangePopupOpen] = React.useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState(false);
  const [isPopupWithMenuOpen, setIsPopupWithMenuOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState('');
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [isTokenSet, setIsTokenSet] = React.useState(false);
  const [isRegChekToken, setIsRegChekToken] = React.useState(false);
  const [isLogChekToken, setIsLogCheckToken] = React.useState(false);
  const [isShortMoviesAllowed, setIsShortMoviesAllowed] = React.useState(true);
  const [isSavedShortMoviesAllowed, setIsSavedShortMoviesAllowed] = React.useState(true);
  const [previousInputValue, setPreviousInputValue] = React.useState('');
  const [favoriteMoviesList, setFavoriteMoviesList] = React.useState([]);
  const [searchError, setSearchError] = React.useState('');
  const [searchGeneralError, setSearchGeneralError] = React.useState('');
  const [initialFavoriteMovies, setInitialFavoriteMovies] = React.useState([]);
  const [initialMoviesArray, setInitialMoviesArray] = React.useState([]);
  const [lastSavedSearchValue, setLastSavedSearchValue] = React.useState('');
  const [loginErrorMessage, setLoginErrorMessage] = React.useState('');
  const [registerErrorMessage, setRegisterErrorMessage] = React.useState('');
  const [serverError, setServerError] = React.useState('');
  const [errorPopupMessage, setErrorPopupMessage] = React.useState('');
  const [lastSearchValue, setLastSearchValue] = React.useState('');

  const [itemsToShow, setItemsToShow] = React.useState(12);
  const [queryToAdd, setQueryToAdd] = React.useState(3);
  const [savedItemsToShow, setSavedItemsToShow] = React.useState(Number);

  const location = useLocation()

  useEffect(()=>{
    handleCleanErrors()
  },
  [location])

  function handleCleanErrors() {
    setServerError('')
    setLoginErrorMessage('')
    setRegisterErrorMessage('')
    setSearchError('')
    setSearchGeneralError('')
  }

  function handleScreenSize(isTablet, isMobile) {
    if (isTablet && !isMobile) {
      changeMoviesList(8, 2)
    } else if (isMobile) {
      changeMoviesList(5, 2)
    } else {
      changeMoviesList(12, 3)
    }
  }

  function changeMoviesList(quantity, quantityAdd) {
      setItemsToShow(quantity);
      setQueryToAdd(quantityAdd);
  }

  useEffect(()=>{
    if (!localStorage.getItem('jwt')) {
      cleanTokenWork();
      return;
    }
    setIsPreloaderOpen(true);
    const jwt = localStorage.getItem('jwt');
    auth.checkToken(jwt)
      .then(data => {
        if(!data._id) {
          cleanTokenWork()
          localStorage.setItem('jwt', '');
          return Promise.reject (data.message);
        } 
        setCurrentUser(data);
        setIsLoggedIn(true);
        MainApi.setToken(jwt);
        if(isRegChekToken) {
          cleanTokenWork();
          setIsConfirmReqPopupOpen(true);
        } else if (isLogChekToken) {
          cleanTokenWork()          
        } else {
          setIsPreloaderOpen(false);
        }
        history.push('/movies');
      })
      .catch(err=>{
        cleanTokenWork()
        localStorage.setItem('jwt', '');
        handleOpenErrorPopup(err);
      });
  }, [isTokenSet])

  function cleanTokenWork() {
        setIsRegChekToken(false);
        setIsLogCheckToken(false);
        setIsPreloaderOpen(false);
  }

  function handleRegister(name, email, password) {
    setIsPreloaderOpen(true);
    auth.signUp(name, email, password)
      .then((data) => {
        if(!data._id) {
          setIsPreloaderOpen(false);
          handleOpenErrorPopup('');
          return Promise.reject (data.message);
        } else {
          setIsRegChekToken(true);
          return handleLogin(email, password)
        } 
      })
      .catch(err => {
        if (err) {
          handleOpenErrorPopup(err);
        } else {
          handleOpenErrorPopup('');
        }
        setIsPreloaderOpen(false);
      })
      .finally(() => {
        setIsPreloaderOpen(false);
      })
  }

  function handleLogin(email, password) {
    setIsPreloaderOpen(true);
    auth.signIn(email, password)
      .then(res =>{
        if (res.data) {
          localStorage.setItem('jwt', res.data);
          if (isRegChekToken) {
            setIsTokenSet(true);
          } else {
            setIsLogCheckToken(true);
            setIsTokenSet(true);
          }
          return;
        } else {
          setIsPreloaderOpen(false);
          setLoginErrorMessage('Неверный email или пароль')
          return;
        }
      })
      .catch((err) =>{
        handleOpenErrorPopup('');
        setIsPreloaderOpen(false);
      })
      .finally(() => {
      })
  }

  function hanldeSearch(value) {
    setIsPreloaderOpen(true);
    setPreviousInputValue(value);
    MoviesApi.getMovies()
      .then((data) =>{
        searchMovies(value, data);
        return;
      })
      .catch(err =>{
        setServerError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
      })
      .finally(() => {
        setIsPreloaderOpen(false);
      })
  }

  useEffect(() =>{
    if (initialMoviesArray.length === 0) {
      return;
    }
    const newMoviesArray = initialMoviesArray.filter(item => {  
      if (isShortMoviesAllowed) {
        return item;
      } else {
        return item.duration >= 40
      }
    });
    checkIsMovieSaved(newMoviesArray, favoriteMoviesList)
    setMoviesList(newMoviesArray);
    setLocalLastData(newMoviesArray);
    if (newMoviesArray.length === 0) {
      setSearchGeneralError('Ничего не найдено')
    } else {
      setSearchGeneralError('')
    }  
  },[isShortMoviesAllowed])

  useEffect(() =>{
    if (initialFavoriteMovies.length === 0) {
      return;
    }
    hanldeSearchSaved(lastSavedSearchValue)
  },[isSavedShortMoviesAllowed])

  function handleSetLastSavedSearcValue(value) {
    setLastSavedSearchValue(value)
  }

  function handleGetLastData() {
    const lastData = JSON.parse( localStorage.moviesNew );
    setMoviesList(lastData.movies)
    setInitialMoviesArray(lastData.movies)
    setIsShortMoviesAllowed(lastData.checkBox)
    setLastSearchValue(lastData.lastValue)
    // console.log(lastData)
  }

  function setLocalLastData(newMoviesList){
    const lastNewData = JSON.parse( localStorage.moviesNew );
    lastNewData.movies = newMoviesList;
    lastNewData.checkBox = isShortMoviesAllowed;
    localStorage.setItem("moviesNew", JSON.stringify(lastNewData));
    // const newData = JSON.parse( localStorage.moviesNew );
    // console.log(newData)
  }

  function searchMovies(value, data) {
    MainApi.getMovies()
      .then((newSavedList) => {
        const moviesArray = [];
        const initialMovies = [];
        data.forEach((item) => {
          if (item.nameRU.toLowerCase().includes(value.toLowerCase()) || item.nameEN.toLowerCase().includes(value.toLowerCase())) {
            createMoviesList(initialMovies, item)
            if(!isShortMoviesAllowed) {
              if (item.duration >= 40) {
                createMoviesList(moviesArray, item)
                /*
                moviesArray.push({
                  country: item.country,
                  director: item.director,
                  duration: item.duration,
                  year: item.year,
                  description: item.description,
                  image: `https://api.nomoreparties.co${item.image.url}`,
                  trailerLink: item.trailerLink,
                  thumbnail: `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
                  movieId: item.id,
                  nameRU: item.nameRU,
                  nameEN: item.nameEN,
                })
                */
              } 
            } else {
              createMoviesList(moviesArray, item)
              /* 
              moviesArray.push({
                country: item.country,
                director: item.director,
                duration: item.duration,
                year: item.year,
                description: item.description,
                image: `https://api.nomoreparties.co${item.image.url}`,
                trailerLink: item.trailerLink,
                thumbnail: `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
                movieId: item.id,
                nameRU: item.nameRU,
                nameEN: item.nameEN,
              })
              */
            }
          }
        })
        if (newSavedList === 0) {
          setMoviesList(moviesArray);
        } else {
          checkIsMovieSaved(moviesArray, newSavedList)
          setMoviesList(moviesArray);
          setFavoriteMoviesList(newSavedList)
        }
        localStorage.setItem("moviesNew", JSON.stringify({movies: moviesArray, lastValue: value, checkBox: isShortMoviesAllowed}));
        // localStorage.setItem("moviesNew", JSON.stringify({lastValue: value}));
        // setLocalLastData(value);
        setInitialMoviesArray(initialMovies);
        if (moviesArray.length === 0) {
          setSearchGeneralError('Ничего не найдено')
        } else {
          setSearchGeneralError('')
        }
      })
      .catch(() => {
        setServerError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
      })
  }

  function checkIsMovieSaved(currentArray, savedList){
    currentArray.map((m) => 
      savedList.forEach((movie) => {
        if(movie.movieId === m.movieId) {
            m.owner=currentUser._id
            m._id = movie._id 
        } else {
          return m
        }
      })
    )
    
  }

  function createMoviesList(moviesArray, item) {
    return moviesArray.push({
      country: item.country,
      director: item.director,
      duration: item.duration,
      year: item.year,
      description: item.description,
      image: `https://api.nomoreparties.co${item.image.url}`,
      trailerLink: item.trailerLink,
      thumbnail: `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
      movieId: item.id,
      nameRU: item.nameRU,
      nameEN: item.nameEN,
    })  
  }

  function handleHideSearchGeneralError() {
    setSearchGeneralError('')
  }

  function handleShowSavedMovies() {
    setFavoriteMoviesList(initialFavoriteMovies.filter(item => {  
      if (isSavedShortMoviesAllowed) {
        return item
      } else {
        return item.duration >= 40
      }
    }))
  }

  function handleGetSavedMovies() {
    setIsPreloaderOpen(true);
    MainApi.getMovies()
      .then((data) => {
        setSavedItemsToShow(data.length)
        setFavoriteMoviesList(data);
        setInitialFavoriteMovies(data)
      })
      .catch(() => {
        setServerError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
      })
      .finally(() => {
        setIsPreloaderOpen(false);
      })
  }

  function handleOpenErrorPopup(message) {
    setErrorPopupMessage(message)
    setIsErrorPopupOpen(true);
  }

  function hanldeMovieLikeClick(value) {
    if (!value.hasOwnProperty("owner")) {
      setIsPreloaderOpen(true);
      MainApi.sendMovie(value, currentUser)
        .then((data) => {
          const newMoviesList = moviesList.map((m) => m.movieId === data.movieId ? data : m)
          console.log(newMoviesList)
          // setMoviesList((state) => state.map((m) => m.movieId === data.movieId ? data : m)); 
          setMoviesList(newMoviesList)
          setLocalLastData(newMoviesList)
          favoriteMoviesList.push(data);
        })
        .catch(err => {
          console.log(err)
          if (err.status === 400) {
            handleOpenErrorPopup('переданы некорректные данные');
          } else {
            handleOpenErrorPopup('');
          }
          
        })
        .finally(() => {
          setIsPreloaderOpen(false);
        })
    } else {
      DelMovie(value._id)
    }
  }

  function DelMovie(id) {
    setIsPreloaderOpen(true);
    MainApi.removeMovie(id)
      .then((data) => {
        removeLikeAtMovie(data)
      })
      .catch(err => {
        handleOpenErrorPopup(err);
      })
      .finally(() => {
        setIsPreloaderOpen(false);
      })
  }

  function removeLikeAtMovie(movie) {
    setFavoriteMoviesList(favoriteMoviesList.filter(item => item._id !== movie._id));
    delete movie.owner;
    delete movie._id;
    const newMoviesList = moviesList.map((m) => m.movieId === movie.movieId ? movie : m)
    setMoviesList(newMoviesList)
    setLocalLastData(newMoviesList)
    // setMoviesList((state) => state.map((m) => m.movieId === movie.movieId ? movie : m)); 
    setInitialMoviesArray((state) => state.map((m) => m.movieId === movie.movieId ? movie : m)); 
  }

  function hanldeSearchSaved(value) {
    const newFavoriteList = initialFavoriteMovies.filter(item => {  
      if (isSavedShortMoviesAllowed) {
        return item.nameRU.toLowerCase().includes(value)
      } else {
        return item.nameRU.toLowerCase().includes(value) && item.duration >= 40
      }
    });
    setFavoriteMoviesList(newFavoriteList)
    if (newFavoriteList.length === 0) {
      setSearchError('Ничего не найдено')
    } else {
      setSearchError('')
    }
  }

  function handleHideSearchError() {
    setSearchError('')
  }

  function handleProfile(name, email) {
    setIsPreloaderOpen(true);
    MainApi.setUserInfo(name, email)
      .then((data) => {
        setCurrentUser(data)
        setIsPreloaderOpen(false);
        setIsConfirmChangePopupOpen(true);  
      })
      .catch(err => {
        if (err.status === 409) {
          handleOpenErrorPopup('пользователь с таким email уже зарегистрирован');  
        } else {
          handleOpenErrorPopup('');
        }
      })
      .finally(() => {
        setIsPreloaderOpen(false);
      })
  }

  function handleGoBack() {
    window.history.back()
  }

  function handleConfirmReqPopupClose() {
    setIsRegChekToken(false);
    closeAllPopups();
    // setIsLoggedIn(true);
    // history.push('/movies')
  }

  function closeAllPopups(){
    setIsConfirmReqPopupOpen(false);
    setIsConfirmChangePopupOpen(false);
    setIsErrorPopupOpen(false);
    setIsPopupWithMenuOpen(false);
    setTimeout(() => {
      setErrorPopupMessage('')
    }, 1000)
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

  function handleExitProfile() {
    setIsPreloaderOpen(true);
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setIsLoggedIn(false);
    setIsTokenSet(false);
    setPreviousInputValue('')
    setMoviesList([])
    setFavoriteMoviesList([])
    setIsPreloaderOpen(false);
  }

  function handleCheckBoxClick() {
    setIsShortMoviesAllowed(!isShortMoviesAllowed)
  }

  function handleCheckBoxClickSavedMovies() {
    setIsSavedShortMoviesAllowed(!isSavedShortMoviesAllowed)
  }

  function handleDelSavedMovie(value) {
    setIsPreloaderOpen(true);
    MainApi.removeMovie(value._id)
      .then(() => {
        setFavoriteMoviesList(favoriteMoviesList.filter(item => item._id !== value._id));
        setInitialFavoriteMovies(favoriteMoviesList.filter(item => item._id !== value._id));
        if (moviesList.length !==0) {  
          removeLikeAtMovie(value)
        }
      })
      .catch(err => {
        handleOpenErrorPopup(err);
      })
      .finally(()=> {
        setIsPreloaderOpen(false);
      })
  }

  function handleCleanApiErrors() {
    setLoginErrorMessage('')
    setRegisterErrorMessage('')
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path='/'>
            <Main
              isLoggedIn = {isLoggedIn}
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
              onAddClick = {changeMoviesList}
              onNavMenuClick = {handleNavClickMovies}
              onCheckBoxClick = { handleCheckBoxClick }
              isCheked = {isShortMoviesAllowed}
              onScreenSize= {handleScreenSize}
              itemsToShow={itemsToShow}
              queryToAdd={queryToAdd}
              previousValue = {previousInputValue}
              searchGeneralError={searchGeneralError}
              hideSearchGeneralError={handleHideSearchGeneralError}
              serverError={serverError}
              getLastData={handleGetLastData}
              lastSearchValue={lastSearchValue}
            />
            <Footer/>
          </ProtectedRoute>  

          <ProtectedRoute exact path='/saved-movies' isLoggedIn={isLoggedIn}>
            <SavedMovies
              className = "app__savedMovies"
              isLoggedIn = {isLoggedIn}
              onSubmit = {hanldeSearchSaved}
              favoriteMovies = {favoriteMoviesList}
              delMovie = {handleDelSavedMovie}
              onNavMenuClick = {handleNavClickSavedMovies}
              onCheckBoxClick = { handleCheckBoxClickSavedMovies }
              isCheked = {isSavedShortMoviesAllowed}
              getSavedMovies ={handleGetSavedMovies}
              itemsToShow = {savedItemsToShow}
              searchError= {searchError}
              hideSearchError = {handleHideSearchError}
              setLastValue = {handleSetLastSavedSearcValue}
              showSavedMovies = {handleShowSavedMovies}
              serverError={serverError}
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

          <Route exact path='/sign-up'>
            <Register
              onRegister = {handleRegister}
              registerErrorMessage = {registerErrorMessage}
              cleanErrorMessage = {handleCleanApiErrors}
            />
          </Route>

          <Route exact path='/sign-in'>
            <Login
              onLogin = {handleLogin}
              loginErrorMessage = {loginErrorMessage}
              cleanErrorMessage = {handleCleanApiErrors}
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
          message={errorPopupMessage}
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
- check box переключать из local storage
- зачем setLastValue в Saved Movies
- все из заметки
*/