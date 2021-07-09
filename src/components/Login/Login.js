import {Link} from 'react-router-dom';
import Logo from '../../images/logo.svg';
// import {useState} from 'react';
import {useForm, useFormWithValidation} from '../UseForm/UseForm';
import './Login.css'

function Login(props) {

    // const [userData, setUserData] = useState({
    //     email: '',
    //     password: ''
    //   })
    // const [message, setMessage] = useState('');

    const formData = useForm();
    const checkForm = useFormWithValidation();

    const handleChange = (e) => {
        formData.handleChange(e);
        checkForm.handleChange(e);
    }

    const handleSubmit = (e) => {
        // console.log(userData)
        e.preventDefault();
        props.onLogin(formData.values)
        // .catch(err => setMessage(err.message || 'Что-то пошло не так'));
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
                    <input required type="email" className="login__input" id="name" onChange={handleChange} value={formData.values.email} name="email"/>
                    <span id="name-error" className="login__error">{checkForm.errors.email}</span>
                </div>
                <div className="login__constructor">
                    <p className="login__signature">Пароль</p>
                    <input type="password" minLength="8" className="login__input" id="name" onChange={handleChange} value={formData.values.password} name="password"/>
                    <span id="name-error" className="login__error">{checkForm.errors.password}</span>
                </div>
                <p className="login__error">{props.message}</p>
                <button className="login__button login__button_register">Войти</button>
            </form>
            <p className="login__question">
                Ещё не зарегистрированы? <Link className="login__redirection" to='/signup'>Регистрация</Link>
            </p>
        </section>
    )
}

export default Login;
