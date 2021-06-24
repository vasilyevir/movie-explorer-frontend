import {Link} from 'react-router-dom';
import Logo from '../../images/logo.svg'
import './Register.css'

function Register() {
    
    return (
        <section className='login'>
            <Link to='/'>
                <img src={Logo} alt="Аватар" className="login__logo"/>
            </Link>
            <h1 className='login__head'>Добро пожаловать!</h1>
            <form className="login__form">
                <div className="login__constructor">
                    <p className="login__signature">Имя</p>
                    <input required minLength="2" maxLength="40" type="text" className="login__input" id="name"/>
                    <span id="name-error" className="login__error"></span>
                </div>
                <div className="login__constructor">
                    <p className="login__signature">E-mail</p>
                    <input required minLength="2" maxLength="40" type="text" className="login__input" id="name"/>
                    <span id="name-error" className="login__error"></span>
                </div>
                <div className="login__constructor">
                    <p className="login__signature">Пароль</p>
                    <input required minLength="2" maxLength="40" type="password" className="login__input" id="name"/>
                    <span id="name-error" className="login__error">Что-то пошло не так...</span>
                </div>
                <button className="login__button">Зарегистрироваться</button>
            </form>
            <p className="login__question">
                Уже зарегистрированы? <Link className="login__redirection" to='/signin'>Войти</Link>
            </p>
        </section>
    )
}

export default Register;
