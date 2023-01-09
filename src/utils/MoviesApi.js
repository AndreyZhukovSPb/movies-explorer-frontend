class Api {
  constructor({baseUrl, token}) {
    this._baseUrl = baseUrl;
  }

  _getHeaders(){
    return {
        'content-type': 'application/json',
    }
  }
  
  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._getHeaders()
    })
    .then(this._getJsonOrError)
  }

  _getJsonOrError(res){
    if (res.ok){
        return res.json();
    }
    return Promise.reject({status: res.status})
  }
  
}


const MoviesApi = 
new Api(
  {baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
  }
)

export default MoviesApi;






  




