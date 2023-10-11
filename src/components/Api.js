const onError = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка ${res.status} ${res.statusText}`);
  }
}

export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => onError(res))
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, link })
    })
      .then((res) => onError(res))
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}/`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then((res) => onError(res))
  }

  getMyInfo() {
    return fetch(`${this._url}/users/me/`, {
      headers: this._headers
    })
      .then((res) => onError(res))
  }

  setMyInfo() {
    return fetch(`${this._url}/users/me/`, {
      headers: this._headers,
      method: 'PATCH',
    })
      .then((res) => onError(res))
  }
}