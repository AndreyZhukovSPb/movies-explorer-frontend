import movie1 from '../images/movie_2.svg';
import movie2 from '../images/movie_3.svg';
import movie3 from '../images/movie_4.svg';
import movie4 from '../images/movie_5.svg';
import movie5 from '../images/movie_6.svg';
import movie6 from '../images/movie_7.svg';
import movie7 from '../images/movie_8.svg';
import movie8 from '../images/movie_9.svg';
import movie9 from '../images/movie_10.svg';
import movie10 from '../images/movie_11.svg';
import movie11 from '../images/movie_12.svg';



const initialMovies = [
  {
    image: movie9,
    nameRU: "тест по русскому1",
    nameEN: "testinenglish1",
    country: "movies 30_2",
    director: "diretcor1",
    duration: 133,
    year: "2022",
    description: "about",
    trailerLink: "https://images.unsplash.com/photo-1667996365888-0e7104a88c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    thumbnail: "https://images.unsplash.com/photo-1667996365888-0e7104a88c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    movieId: "1",
    owner: "me",
  },
  {
    image: movie2,
    nameRU: "тест по русскому2",
    nameEN: "testinenglish2",
    country: "movies 30_2",
    director: "diretcor1",
    duration: 120,
    year: "2022",
    description: "about",
    trailerLink: "https://images.unsplash.com/photo-1667996365888-0e7104a88c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    thumbnail: "https://images.unsplash.com/photo-1667996365888-0e7104a88c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    movieId: "2",
  },
  {
    image: movie3,
    nameRU: "тест по русскому3",
    nameEN: "testinenglish3",
    country: "movies 30_2",
    director: "diretcor1",
    duration: 55,
    year: "2022",
    description: "about",
    trailerLink: "https://images.unsplash.com/photo-1667996365888-0e7104a88c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    thumbnail: "https://images.unsplash.com/photo-1667996365888-0e7104a88c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    movieId: "3",
    owner: "notMe",
  },
  {
    image: movie3,
    nameRU: "тест по русскому3",
    nameEN: "testinenglish3",
    country: "movies 30_2",
    director: "diretcor1",
    duration: 55,
    year: "2022",
    description: "about",
    trailerLink: "https://images.unsplash.com/photo-1667996365888-0e7104a88c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    thumbnail: "https://images.unsplash.com/photo-1667996365888-0e7104a88c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    movieId: "4",
    owner: "me",
  },
];

const initialFavoritesMovies = [
  {
    image: movie11,
    nameRU: "тест по русскому2",
    nameEN: "testinenglish2",
    country: "movies 30_2",
    director: "diretcor1",
    duration: 120,
    year: "2022",
    description: "about",
    trailerLink: "https://images.unsplash.com/photo-1667996365888-0e7104a88c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    thumbnail: "https://images.unsplash.com/photo-1667996365888-0e7104a88c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    movieId: "2",
  },
  {
    image: movie2,
    nameRU: "тест по русскому2",
    nameEN: "testinenglish2",
    country: "movies 30_2",
    director: "diretcor1",
    duration: 120,
    year: "2022",
    description: "about",
    trailerLink: "https://images.unsplash.com/photo-1667996365888-0e7104a88c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    thumbnail: "https://images.unsplash.com/photo-1667996365888-0e7104a88c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    movieId: "6",
  },
  {
    image: movie3,
    nameRU: "тест по русскому2",
    nameEN: "testinenglish2",
    country: "movies 30_2",
    director: "diretcor1",
    duration: 120,
    year: "2022",
    description: "about",
    trailerLink: "https://images.unsplash.com/photo-1667996365888-0e7104a88c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    thumbnail: "https://images.unsplash.com/photo-1667996365888-0e7104a88c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    movieId: "61",
  },
  {
    image: movie4,
    nameRU: "тест по русскому2",
    nameEN: "testinenglish2",
    country: "movies 30_2",
    director: "diretcor1",
    duration: 120,
    year: "2022",
    description: "about",
    trailerLink: "https://images.unsplash.com/photo-1667996365888-0e7104a88c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    thumbnail: "https://images.unsplash.com/photo-1667996365888-0e7104a88c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    movieId: "7",
  },
  
]

export { initialMovies, initialFavoritesMovies };


