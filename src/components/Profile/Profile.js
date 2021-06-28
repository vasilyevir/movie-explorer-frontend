import {Link} from 'react-router-dom';
import Header from '../Header/Header'
import Avatar from '../../images/account.svg'
import './Profile.css'

function Profile() {

    
    
    return (
            <>        
                <Header>
                    <div className="header__nav-bar header__nav-bar_movies">
                        <div className="header__films-link">
                            <Link to='/movies' className="header__links">Фильмы</Link>
                            <Link to='/saved-movies' className="header__links">Сохранённые фильмы</Link>
                        </div>
                        <Link to='/saved-movies' className="header__account">
                            <p className="header__account-text">Аккаунт</p>
                            <div className="header__account-logo">
                                <img src={Avatar} alt='account logo' className="header__logo-man"/>
                            </div>
                        </Link>
                    </div>
                    <button className="header__btn-popup"></button>
                </Header>
                <section className='profile'>
                    <h1 className='profile__head'>Привет, Илья</h1>
                    <form className="profile__form">
                        <div className="profile__constructor">
                            <p className="profile__signature">Имя</p>
                            <input required minLength="2" maxLength="40" type="text" className="profile__input" id="name" value="Илья"/>
                        </div>
                        <div className="profile__constructor">
                            <p className="profile__signature">E-mail</p>
                            <input required minLength="2" maxLength="40" type="email" className="profile__input" id="name" value="vasilyevir@yandex.ru"/>
                        </div>
                        <Link to='/movies'>
                            <button className="profile__button profile__button_register">Редактировать</button>
                        </Link>
                    </form>
                    <Link className="profile__redirection" to='/signup'>Выйти из аккаунта</Link>
                </section>
            </>
    )
}

export default Profile;
