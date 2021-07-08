class Api{
    constructor(data){
        this._address = data.address;
        this._token = `Bearer ${localStorage.getItem('token')}`;
    }
    
    getInformation(){
        return fetch(`${this._address}/users/me`, {
            headers: {
                authorization : this._token
            }
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }

        return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    getMovies(){
        return fetch(`${this._address}/movies`,{
            headers: {
                authorization : this._token
            }
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }

        return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    changeProfile(obj){
        console.log(obj)
        return fetch(`${this._address}/users/me`,{
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: obj.name,
                email: obj.email,
                emailChanged: obj.emailChanged
              })
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }

        return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    postMovies(obj){
        console.log(obj)
        return fetch(`${this._address}/movies`,{
            method: 'POST',
            headers: {
                authorization : this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country: obj.country,
                director: obj.director,
                duration: obj.duration,
                year: obj.year,
                description: obj.description,
                image: obj.image,
                trailer: obj.trailer,
                nameRU: obj.nameRU,
                nameEN: obj.nameEN,
                thumbnail: obj.thumbnail,
                movieId: obj.movieId,
              }) 
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }

        return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteMovies(moviesId){
        return fetch(`${this._address}/movies/${moviesId}`,{
            method: 'DELETE',
            headers: {
                authorization : this._token
            }
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }

        return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    authorize(password, email){
        console.log(password, email)
        return fetch(`${this._address}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password, 
            })
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
        

        return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    register(name, email, password){
        return fetch(`${this._address}/signup`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
              }) 
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }

        return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}

const config = {
    address: `http://api.vasilyevir-movies.nomoredomains.icu`
}

const api = new Api(config);

export default api;
