import {Link} from 'react-router-dom';
import Logo from '../../images/logo.svg';
import {useState} from 'react';
import './Login.css'

function Login(props) {

    const [userData, setUserData] = useState({
        email: '',
        password: ''
      })
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
        ...userData,
        [name]: value
    })
    }

    const handleSubmit = (e) => {
        console.log(userData)
        e.preventDefault();
        props.onLogin(userData)
        .catch(err => setMessage(err.message || 'Что-то пошло не так'));
    }

    return (
        <section className='login'>
            <Link to='/'>
                <img src={Logo} alt="Аватар" className="login__logo"/>
            </Link>
            <h1 className='login__head'>Рады видеть!</h1>
            <form className="login__form" onSubmit={handleSubmit}>
                <div className="login__constructor">
                    <p className="login__signature">E-mail</p>
                    <input required minLength="2" maxLength="40" type="text" className="login__input" id="name" onChange={handleChange} value={userData.email} name="email"/>
                    <span id="name-error" className="login__error"></span>
                </div>
                <div className="login__constructor">
                    <p className="login__signature">Пароль</p>
                    <input type="password" className="login__input" id="name" onChange={handleChange} value={userData.password} name="password"/>
                    <span id="name-error" className="login__error"></span>
                </div>
                <button className="login__button login__button_register">Войти</button>
            </form>
            <p className="login__question">
                Ещё не зарегистрированы? <Link className="login__redirection" to='/signup'>Регистрация</Link>
            </p>
        </section>
    )
}

export default Login;
