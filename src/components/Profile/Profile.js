import {Link} from 'react-router-dom';
import Header from '../Header/Header'
import Avatar from '../../images/account.svg'
import {useState, useContext} from 'react';
import {useFormWithValidationProfile} from '../UseForm/UseForm';
import './Profile.css'
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile(props) {
    const currentUser = useContext(CurrentUserContext);
    const checkForm = useFormWithValidationProfile(currentUser);

    const handleChange = (e) => {
        checkForm.handleChange(e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailChanged = currentUser.email === checkForm.values ? false : true;
        props.update(checkForm.values, emailChanged)
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
                        <div className="popup__list">
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
                <section className='profile'>
                    <h1 className='profile__head'>Привет, Илья</h1>
                    <form className="profile__form" onSubmit={handleSubmit}>
                        <div className="profile__constructor">
                            <p className="profile__signature">Имя</p>
                            <input required minLength="2" maxLength="40" type="text" className="profile__input" id="name" onChange={handleChange} value={checkForm.values.name} name="name"/>
                        </div>
                        <span id="name-error" className="login__error">{checkForm.errors.name}</span>
                        <div className="profile__constructor">
                            <p className="profile__signature">E-mail</p>
                            <input required minLength="2" maxLength="40" type="email" className="profile__input" id="name" onChange={handleChange} value={checkForm.values.email} name="email"/>
                        </div>
                        <span id="name-error" className="login__error">{checkForm.errors.email}</span>
                        <span id="name-error" className="login__error">{props.message}</span>
                        <button className="profile__button profile__button_register">Редактировать</button>
                    </form>
                    <button className="profile__redirection" onClick={props.signOut} to='/signup'>Выйти из аккаунта</button>
                </section>
            </>
    )
}

export default Profile;
