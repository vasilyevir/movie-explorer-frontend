import {Link} from 'react-router-dom';
import Logo from '../../images/logo.svg'
import './Login.css'

function Login() {

    
    
    return (
        <section className='login'>
            <Link to='/'>
                <img src={Logo} alt="Аватар" className="login__logo"/>
            </Link>
            <h1 className='login__head'>Рады видеть!</h1>
            <form className="login__form">
                <div className="login__constructor">
                    <p className="login__signature">E-mail</p>
                    <input required minLength="2" maxLength="40" type="text" className="login__input" id="name"/>
                    <span id="name-error" className="login__error"></span>
                </div>
                <div className="login__constructor">
                    <p className="login__signature">Пароль</p>
                    <input required minLength="2" maxLength="40" type="password" className="login__input" id="name"/>
                    <span id="name-error" className="login__error"></span>
                </div>
                <Link to='/movies'>
                    <button className="login__button login__button_register">Войти</button>
                </Link>
            </form>
            <p className="login__question">
                Ещё не зарегистрированы? <Link className="login__redirection" to='/signup'>Регистрация</Link>
            </p>
        </section>
    )
}

export default Login;
