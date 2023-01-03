class Api {
  constructor({baseUrl, token}) {
    this._baseUrl = baseUrl;
  }

  _getHeaders(){
    return {
        authorization: this._token,
        'content-type': 'application/json',
    }
  }
  
  sendMovie (movie, currentUser) {
    return fetch(`${this._baseUrl}/movies`, {
        method: 'POST',
        headers: this._getHeaders(),
        body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: movie.image,
          trailerLink: movie.trailerLink,
          thumbnail: movie.thumbnail,
          movieId: movie.movieId,
          owner: currentUser._id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        })
      })
      .then(this._getJsonOrError)
  }

  removeMovie(id){
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
      })
    .then(this._getJsonOrError)
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }

  setUserInfo (newName, newEmail){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: newName,
        email: newEmail
      })
    })
    .then(this._getJsonOrError)
  }

  _getJsonOrError(res){
    if (res.ok){
        return res.json();
    }
    return Promise.reject({status: res.status})
  }

  setToken(jwt) {
    this._token = `Bearer ${jwt}`;
  }
}

const MainApi = 
new Api(  
  {baseUrl: 'https://api.diploma.zhukov.nomoredomains.club'
  }
)

export default MainApi;

// https://api.diploma.zhukov.nomoredomains.club
// http://localhost:4000
