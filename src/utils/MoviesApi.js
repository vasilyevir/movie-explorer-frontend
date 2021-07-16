export const BASE_URL = 'https://api.nomoreparties.co';

export const getContent = () => {
    return fetch(`${BASE_URL}/beatfilm-movies`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(checkResponse)
};

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`)