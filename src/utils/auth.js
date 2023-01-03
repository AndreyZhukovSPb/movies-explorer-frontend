// export const BASE_URL = 'https://api.diploma.zhukov.nomoredomains.club';


export const BASE_URL = 'https://api.diploma.zhukov.nomoredomains.club';

function request ({
  url,
  method,
  token,
  data,
  }) {
  return fetch(
    `${BASE_URL}${url}`,
    {
      method,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...!!token && {"Authorization": `Bearer ${token}`}
      },
      ...!!data && {body: JSON.stringify(data)}
    })
    .then(res =>{
      return res.json();
    })
  }

export function signUp (name, email, password) {
  return request ({
    url: '/signup',
    data: {name, email, password},
    method: "POST",
  })
}

export function checkToken (token) {
  return request ({
    url: '/users/me',
    method: "GET",
    token
  })
}

export function signIn (email, password) {
  return request ({
    url: '/signin',
    data: {email, password},
    method: "POST",
  })
}