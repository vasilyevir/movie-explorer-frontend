import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Card from '../Card/Card';
import './SavedMovies.css'
import {Link} from 'react-router-dom';
import Avatar from '../../images/account.svg';

function SavedMovies() {
    const films = [
        {
            filmsImage: 'https://sun9-26.userapi.com/ICK07vYWtjXTGGjfvIXH0U4UqxU0UQAXHwcziQ/a2h42K1uOfw.jpg',
            filmsName: '33 слова о дизайне',
            isLiked: true,
            filmsLength: '1ч42м'
        }, 
        {
            filmsImage: 'https://sun9-26.userapi.com/ICK07vYWtjXTGGjfvIXH0U4UqxU0UQAXHwcziQ/a2h42K1uOfw.jpg',
            filmsName: '33 слова о дизайне',
            isLiked: false,
            filmsLength: '1ч42м'
        },
        {
            filmsImage: 'https://sun9-26.userapi.com/ICK07vYWtjXTGGjfvIXH0U4UqxU0UQAXHwcziQ/a2h42K1uOfw.jpg',
            filmsName: '33 слова о дизайне',
            isLiked: true,
            filmsLength: '1ч42м'
        },
    ]

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
                <button className="header__btn-popup"></button>
            </Header>
            <section className="search-form">
                <form className="search-form__form">
                    <div className="search-form__find-constructor">
                        <input placeholder="Фильм" required className="search-form__input"></input>
                        <button className="search-form__button">Найти</button>
                    </div>
                    <label className="search-form__label">
                        <input type="checkbox" className="search-form__checkbox"></input>
                        <span className="search-form__checkbox-round"></span>
                        <span className="search-form__visible-checkbox"></span>
                        <span className="search-form__checkbox-text">Короткометражки</span>
                    </label>
                </form>
            </section>   
            <section className="movies-cardlist">
                {films.map((item)=>(
                    <Card
                        key = {item._id}
                        filmsImage = {item.filmsImage}
                        filmsName = {item.filmsName}
                        isLiked = {item.isLiked}
                        filmsLength = {item.filmsLength}
                        child = {
                            <div>
                                <button className="card__button-delete"></button>
                            </div>
                        }
                    />
                )
                )}
            </section>
            <Footer/>
        </>
    )
}

export default SavedMovies;
