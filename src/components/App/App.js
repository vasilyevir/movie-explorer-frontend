import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import NotFounded from '../NotFounded/NotFounded';
import SavedMovies from '../SavedMovies/SavedMovies';
import { Route, Switch, Redirect, useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import api from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import CurrentMoviesContext from '../../contexts/CurrentMoviesContext';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentMovies, setCurrentMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [quantityFilmsOnPage, setQuantityFilmsOnPage] = useState(0);
  const [quantityAddCardOnPage, setQuantityAddCardOnPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [removeButton, setRemoveButton] = useState(false)
  const [message, setMessage] = useState()

  const checkShowCard = (film, num) => {
    if (film.movieId <= num){
      film.show = true
    } else {
      film.show = false
    }
    return film
  }

  const addCard = (array, num) => {
    // setCurrentMovies(() => array.map(film => checkShowCard(film, num)))/
    const arr = [];
    let i=0;
    array.map(film => {
      arr[i]=checkShowCard(film, num);
      i++;
    })
    localStorage.setItem('movies', JSON.stringify(arr))
  }
  
  const determiningQuantityCard = (array) => {
    const windowInnerWidth = window.innerWidth
      if (945 <= windowInnerWidth && 1267 > windowInnerWidth){
        setQuantityFilmsOnPage(12);
        setQuantityAddCardOnPage(3);
        addCard(array, 12);
      } else if (623 <= windowInnerWidth && 945 > windowInnerWidth) {
        setQuantityFilmsOnPage(8);
        setQuantityAddCardOnPage(2);
        addCard(array, 8);
      } else if (windowInnerWidth < 623) {
        setQuantityFilmsOnPage(5);
        setQuantityAddCardOnPage(1);
        addCard(array, 5);
      }else {
        setQuantityFilmsOnPage(12);
        setQuantityAddCardOnPage(4);
        addCard(array, 12);
      }
  }


  window.onresize = function() {
    setTimeout(determiningQuantityCard(JSON.parse(localStorage.movies), quantityFilmsOnPage), 10000)
  };


  // useEffect(()=>{
  //   determiningQuantityCard();
  // },[])

  const createArrayMovies = (obj, array) => {
    const movie = {};
    movie.isLiked = false
    movie.isSearched = false
    movie.country = obj.country;
    movie.director = obj.director;
    movie.duration = obj.duration;
    movie.year = obj.year;
    movie.description = obj.description;
    movie.image = 'https://api.nomoreparties.co' + obj.image.url;
    movie.trailer = obj.trailerLink;
    movie.nameRU = obj.nameRU;
    movie.nameEN = obj.nameEN;
    movie.thumbnail = 'https://api.nomoreparties.co' +  obj.image.formats.thumbnail.url;
    movie.movieId = obj.id;
    movie.movieId <= quantityFilmsOnPage ? movie.show = true : movie.show = false;
    array.forEach( item => {
      if (item.movieId === movie.movieId){
        movie.isLiked = true
        movie._id = item._id;
      }
    })
    return movie;
  }

  const handleMenuButtonClick = () =>{        
    isPopupOpen();
  }

  const isPopupOpen = () =>{
    setIsOpen(true);
  }

  const checkLoginError = (err) => {
    if (err === 'Ошибка: 401'){
      setMessage('Вы ввели неправильный логин или пароль.');
    } else {
      setMessage('При авторизации произошла ошибка. Токен не передан или передан не в том формате');
    }
  }

  const handleLogin = ({ password, email  }) => {
    return api.authorize(password, email)
      .then((data) => {
        if (!data) throw new Error('Неверные имя пользователя или пароль')
        if (data.token) {
          setLoggedIn(true)
          localStorage.setItem('token', data.token)
          localStorage.setItem('isOpen', true);
          api.getMovies()
            .then(data => {
              const savedMoviesList = data.data
              MoviesApi.getContent()
                .then(data => {
                  const moviesList = []
                  for(let i=0; i<data.length; i++){
                    moviesList[i] = createArrayMovies(data[i], savedMoviesList);
                  }
                  determiningQuantityCard(moviesList);
                })
                .catch((err)=>{console.log(err)})
            })
            .catch((err)=>{console.log(err)})

          api.getInformation()
            .then(data => {
              setCurrentUser(data.data)
            })
            .catch((err)=>{console.log(err)})

          return;
        }
      })
      .catch((err) => 
          checkLoginError(err)
        )
  }

  const checkRegisterError = (err) => {
    if (err === 'Ошибка: 409'){
      setMessage('Пользователь с таким email уже существует');
    } else {
      setMessage('При регистрации пользователя произошла ошибка.');
    }
  }

  const handleRegister = ({ name, email, password  }) => {
    return api.register( name, email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
        history.push("/signin");
        return res;
      })
      .catch((err) => 
          checkRegisterError(err)
        )
  }

  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push("/movies");
    }
  }, [loggedIn])

  useEffect(()=>{
    api.getMovies()
    .then(data => {
      const savedMoviesList = data.data
      MoviesApi.getContent()
        .then(item => {
          const moviesList = []
          for(let i=0; i<item.length; i++){
            moviesList[i] = createArrayMovies(item[i], savedMoviesList);
          }
          determiningQuantityCard(moviesList);
        })
        .catch((err)=>{console.log(err)})
    })
    .catch((err)=>{console.log(err)})
  }, [])

  useEffect(() => {
    tokenCheck()
  }, [])


  const signOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('movies');
    history.push('/signin');
    setLoggedIn(false);
  }

  const tokenCheck = () => {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token');
      if (token){
        setLoggedIn(true)
      }
      if (localStorage.getItem('movies')){
        setCurrentMovies(JSON.parse(localStorage.getItem('movies')));
      }
      api.getInformation()
        .then(data => {
          setCurrentUser(data.data)
        })
        .catch((err)=>{console.log(err)})
    }
  }

  const checkUpdateProfileError = (err) => {
    if (err === 'Ошибка: 409'){
      setMessage('Пользователь с таким email уже существует.');
    } else {
      setMessage('При обновлении профиля произошла ошибка.');
    }
  }

  const updateProfile = (obj, emailChanged) => {
    obj.emailChanged = emailChanged;
    return api.changeProfile(obj)
      .then(data =>{
        setCurrentUser(data);
      })
    .catch(err => checkUpdateProfileError(err))
  }
 
  function handleMovieLike(card) {
    return api.postMovies(card).then((newCard) => {
      newCard.isLiked = true
      newCard.isSearched = true
      newCard.show = true
      setCurrentMovies((state) => state.map((c) => c.movieId === card.movieId ? newCard : c));

      const arr = JSON.parse(localStorage.movies);
      const array = []
      let i=0;
      arr.map(film =>{
        array[i] = film.movieId === card.movieId ? newCard : film;
        i++;
      })
      localStorage.setItem('movies', JSON.stringify(array))
      console.log(JSON.parse(localStorage.movies))


    })
    .catch((err)=>{console.log(err)}) 
  }

  function handleMovieDeleteLike(cardId) {
    return api.deleteMovies(cardId).then((newCard) => {
      const array = JSON.parse(localStorage.movies);
      let movies=[]
      for (let i =0 ;i<array.length; i++){
        if (array[i].movieId === newCard.movieId){
          movies[i] = newCard
          movies[i].isLiked = false
          movies[i].isSearched = true
          movies[i].show = true
        } else {
          movies[i] = array[i]
        }
      }
      setCurrentMovies(movies);
      localStorage.setItem('movies', JSON.stringify(movies))
    })
    .catch((err)=>{console.log(err)}) 
  }

const increaseQuantityCheck = () => {
  increaseQuantity()
}

  const increaseQuantity = () => {

    if (JSON.parse(localStorage.movies).length < quantityFilmsOnPage + quantityAddCardOnPage){
      setRemoveButton(true);
    }
    const movieQuantity = quantityFilmsOnPage + quantityAddCardOnPage;
    console.log(quantityFilmsOnPage, quantityAddCardOnPage)
    setQuantityFilmsOnPage(movieQuantity);
  }

  const handleFilterButtonClick = (nameFilm, shortFilm) => {
    const movie = []
    let i = 0;
    const array = JSON.parse(localStorage.movies);
    array.map(film => film.isSearched = false)
    setCurrentMovies(movie => movie.map(film => film.isSearched = false))
    array.forEach(film => {
      if (shortFilm){
        movie[i] = film;
        if(film.duration < 41){
          const str = film.nameRU.toUpperCase();
          const filmName = nameFilm.toUpperCase();
          if (str.indexOf(filmName) !== -1){
            movie[i].isSearched = true;
          }
        }
      } else {
          const str = film.nameRU.toUpperCase();
          const filmName = nameFilm.toUpperCase();
          movie[i] = film;
          if (str.indexOf(filmName) !== -1){
            movie[i].isSearched = true;
          }
      }
      i++;
   })
   setCurrentMovies(movie)
   localStorage.setItem('movies', JSON.stringify(movie))
  //  console.log(JSON.parse(localStorage.movies), 1);

  }

  const closeAllPopups = () => {
    setIsOpen(false);
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentMoviesContext.Provider value={[currentMovies, setCurrentMovies]}>
          <Switch>
            <Route exact path='/'>
              <Main/>
            </Route>
            <Route path='/signin'>
              <Login
                onLogin={handleLogin}
                message={message}
              />
            </Route>
            <Route path='/signup'>
              <Register
                onRegister={handleRegister}
                message={message}
              />
            </Route>
            <ProtectedRoute path='/movies'
              component={Movies}
              loggedIn={loggedIn}
              cardLike={handleMovieLike}
              moviesList={currentMovies}
              deleteLike={handleMovieDeleteLike}
              filterMovie={handleFilterButtonClick}
              increaseQuantity={increaseQuantityCheck}
              quantityFilmsOnPage = {quantityFilmsOnPage}
              quantityAddCardOnPage={quantityAddCardOnPage}
              removeButton={removeButton}
              determiningQuantityCard={determiningQuantityCard}
              closeAllPopups={closeAllPopups}
              handleMenuButtonClick={handleMenuButtonClick}
              isOpen={isOpen}
            />
            <ProtectedRoute path='/saved-movies'
              component={SavedMovies}
              loggedIn={loggedIn}
              moviesList={currentMovies}
              deleteLike={handleMovieDeleteLike}
              filterMovie={handleFilterButtonClick}
              closeAllPopups={closeAllPopups}
              handleMenuButtonClick={handleMenuButtonClick}
              isOpen={isOpen}
            />
            <ProtectedRoute path='/profile'
              component={Profile}
              loggedIn={loggedIn}
              signOut={signOut}
              infoUser={currentUser}
              update={updateProfile}
              closeAllPopups={closeAllPopups}
              handleMenuButtonClick={handleMenuButtonClick}
              isOpen={isOpen}
              message={message}
            />
            <Route path="*">
              <NotFounded/>
            </Route>
            <Route>
                {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </CurrentMoviesContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;