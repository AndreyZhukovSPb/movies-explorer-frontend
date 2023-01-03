/* 
        потом:
        - ЗАЛИТЬ ФРОНТ В ОБЛАКО!
      
        доделки
        - авторизованные не могут напрямую перейти вбив адрес, кнопка назад возвращает на главную, тк не успевает отработать юзэффект и остается изЛогин - фэлс
        - изменение профиля - уведомить о результатах - убрать попап
        - можно сразу получать стейт сохраненных, а на лайках/дизах его обновлять - с сайта
        - отображение страцицы 404 для зареганых пользователей: переписать рег и логин: оттуда напрямую ходить за данными юзера/токеном и убрать хистори пуш из проверки токена
        - перенести валидацию в отдельный компонент
        - resize
        - как показывать сообщение что данные совпадают с прошлыми
        - перенести запрос за сохраненными фильмами в основной поиск фильнов, а дальше без асинхрона?
        - вместо форич использовать фильтер
        - поправить lang
        - сделать резиновую верстку на промежуточных разрешениях
        - как включить баттон или текст в инпут чтобы фокус хорошо выглядел
        - написать нормальный текст о себе
        - дописать readme
        - вынести константы (regex)

        moviesArray.map((m) => 
            newSavedList.forEach((movie) => {
              if(movie.movieId === m.movieId) {
                m.owner=currentUser._id
                m._id = movie._id 
              } else {
                return m
              }
            })
          ) 
          setMoviesList(moviesArray);

          

  function handleLogin(email, password) {
    setIsPreloaderOpen(true);
    auth.signIn(email, password)
      .then(res =>{
        if (res.data) {
          localStorage.setItem('jwt', res.data);
          auth.checkToken(res.data)
            .then((data) => {
              if(!data) {
                return Promise.reject ('No data');
              } 
              setCurrentUser(data);
              setIsLoggedIn(true);
              MainApi.setToken(res.data);
              setIsPreloaderOpen(false);
              if (sender === 'register' ) {
                history.push('/movies');
              } else if (sender == 'login') {
                history.push('/movies');
              } 
            })
            .catch((err) =>{
              setIsPreloaderOpen(false);
            })
        } else {
          setIsPreloaderOpen(false);
          handleErrorPopup();
          return;  
        }
      })
      .catch(err =>{
        handleErrorPopup();
        setIsPreloaderOpen(false);
      })
  }
*/