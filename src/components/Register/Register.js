import {Link} from 'react-router-dom';
import Logo from '../../images/logo.svg'
// import {useForm} from '../UseForm/UseForm';
import {useState} from 'react';
import './Register.css'

function Register(props) {

    console.log(props.message)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const message = props.message === 'Ошибка: 409' ? 'Пользователь с таким email уже существует' : (userData.name && userData.email && userData.password) ? 'При регистрации пользователя произошла ошибка.' :'';


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        let {name, password, email } = userData;
        console.log(userData, 'handleSumbit')
        e.preventDefault();
        props.onRegister({  name, password, email })
    }  
    

    return (
        <section className='login'>
            <Link to='/'>
                <img src={Logo} alt="Аватар" className="login__logo"/>
            </Link>
            <h1 className='login__head'>Добро пожаловать!</h1>
            <form className="login__form" onSubmit={handleSubmit}>
                <div className="login__constructor">
                    <p className="login__signature">Имя</p>
                    <input required minLength="2" maxLength="40" type="text" className="login__input" id="name" value={userData.name} onChange={handleChange} name="name"/>
                    <span id="name-error" className="login__error"></span>
                </div>
                <div className="login__constructor">
                    <p className="login__signature">E-mail</p>
                    <input required minLength="2" maxLength="40" type="email" className="login__input" id="email" value={userData.email} onChange={handleChange} name="email"/>
                    <span id="name-error" className="login__error"></span>
                </div>
                <div className="login__constructor">
                    <p className="login__signature">Пароль</p>
                    <input required minLength="8" type="password" className="login__input" id="password" value={userData.password} onChange={handleChange} name="password"/>
                    <span id="name-error" className="login__error">{message}</span>
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
