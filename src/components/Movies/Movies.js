import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesList from '../MoviesList/MoviesList';
import './Movies.css'
import {Link} from 'react-router-dom';
import Avatar from '../../images/account.svg';
import {useState, useContext} from 'react';
import CurrentMoviesContext from '../../contexts/CurrentMoviesContext';

function Movies(props) {
    const [currentMovies, setCurrentMovies] = useContext(CurrentMoviesContext);
    const quantityFilmsOnPage = props.quantityFilmsOnPage;
    const quantityAddCardOnPage = props.quantityAddCardOnPage;
    const increaseQuantity = props.increaseQuantity;
    const [nameFilm, setNameFilm] = useState('');
    const [shortFilm, setShortFilm] = useState(false);
    const [userData, setUserData] = useState({
        nameFilm: '',
        shortFilm: false,
      })
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const checkShowCard = (film) => {
        if (film.movieId <= quantityFilmsOnPage + quantityAddCardOnPage){
          film.show = true
        } else {
          film.show = false
        }
        return film
      }
    
      const addCardOnList = () => {
        increaseQuantity();
        setCurrentMovies(state => state.map(film => checkShowCard(film)))
        const array = [];
        let i =0;
        JSON.parse(localStorage.movies).map(film => {
            array[i] = checkShowCard(film)
            i++;
        })
        localStorage.setItem('movies', JSON.stringify(array))
      }

    const handleChangeCheckbox = (e) => {
        console.log(e.target.value)
        const { name } = e.target;
        if(userData.shortFilm === true){
            setUserData({
                ...userData,
                [name]: false
            })
            console.log(userData)
        } else {
            setUserData({
                ...userData,
                [name]: true
            })
        }

    }

    const handleSubmit = (e) => {
        setNameFilm(userData.nameFilm);
        setShortFilm(userData.shortFilm);
        e.preventDefault();
        props.filterMovie(userData.nameFilm, userData.shortFilm)
    }

    return (
        <>
            <Header>
                <div className="header__nav-bar header__nav-bar_movies">
                    <div className="header__films-link">
                        <Link to='/movies' className="header__links">Фильмы</Link>
                        <Link to='/saved-movies' className="header__links">Сохранённые фильмы</Link>
                    </div>
                    <Link to='/profile' className="header__account">
                        <p className="header__account-text">Аккаунт</p>
                        <div className="header__account-logo">
                            <img src={Avatar} alt='account logo' className="header__logo-man"/>
                        </div>
                    </Link>
                </div>
                <button className="header__btn-popup" onClick={props.handleMenuButtonClick}></button>
                <section className={`popup ${props.isOpen && 'popup_is-opened'}`}>
                    <div className="popup__window popup__window_type_form"> 
                        <button
                            onClick={props.closeAllPopups} 
                            className={`popup__btn-close`} 
                            type="button"
                        ></button>
                        <div className="popup__list" name="formEdit">
                            <div className="popup__nav-link">
                                <Link to='/' className="popup__links">Главная</Link>
                                <Link to='/movies' className="popup__links">Фильмы</Link>
                                <Link to='/saved-movies' className="popup__links">Сохранённые фильмы</Link>
                            </div>
                            <Link to='/profile' className="header__account header__account_min-width">
                                <p className="header__account-text">Аккаунт</p>
                                <div className="header__account-logo">
                                    <img src={Avatar} alt='account logo' className="header__logo-man"/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </Header>
            <section className="search-form">
                <form className="search-form__form" onSubmit={handleSubmit}>
                    <div className="search-form__find-constructor">
                        <input placeholder="Фильм" className="search-form__input" onChange={handleChange} value={userData.nameFilm} name="nameFilm"></input>
                        <button className="search-form__button">Найти</button>
                    </div>
                    <label className="search-form__label">
                        <input type="checkbox" className="search-form__checkbox" onChange={handleChangeCheckbox} checked={userData.shortFilm} name="shortFilm"></input>
                        <span className="search-form__checkbox-round"></span>
                        <span className="search-form__visible-checkbox"></span>
                        <span className="search-form__checkbox-text">Короткометражки</span>
                    </label>
                </form>
            </section>   
            <MoviesList
                deleteLike={props.deleteLike}
                cardLike = {props.cardLike}
                nameFilm={nameFilm}
                shortFilm={shortFilm}
                moviesList={currentMovies}
            />
            <button className={props.removeButton ? "movies-cardlist__button movies-cardlist__button_invisible" : "movies-cardlist__button"} onClick={addCardOnList}>Ещё</button>
            <Footer/>
        </>
    )
}


export default Movies;
