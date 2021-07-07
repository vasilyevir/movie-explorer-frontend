import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Card from '../Card/Card';
import './SavedMovies.css'
import {Link} from 'react-router-dom';
import Avatar from '../../images/account.svg';
import {useContext, useState} from 'react';
import CurrentMoviesContext from '../../contexts/CurrentMoviesContext';

function SavedMovies(props) {

    const [currentMovies, setCurrentMovies] = useContext(CurrentMoviesContext);
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
                        <form className={`popup__list`} onSubmit={props.submitForm} name="formEdit">
                            <div className="popup__nav-link">
                                <Link to='/' className="popup__links">Главная</Link>
                                <Link to='/movies' className="popup__links">Фильмы</Link>
                                <Link to='/saved-movies' className="popup__links">Сохранённые фильмы</Link>
                            </div>
                            <Link to='/profile' className="header__account">
                                <p className="header__account-text">Аккаунт</p>
                                <div className="header__account-logo">
                                    <img src={Avatar} alt='account logo' className="header__logo-man"/>
                                </div>
                            </Link>
                        </form>
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
            <section className="movies-cardlist">
                {currentMovies.map((item, id)=>(
                    <Card
                        key = {id}
                        films = {item}
                        deleteLike={props.deleteLike}
                        savedMovies={true}
                        nameFilm={nameFilm}
                        shortFilm={shortFilm}
                    />
                )
                )}
            </section>
            <Footer/>
        </>
    )
}

export default SavedMovies;
