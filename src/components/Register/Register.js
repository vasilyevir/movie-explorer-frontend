import {Link} from 'react-router-dom';
import Logo from '../../images/logo.svg'
import {useState} from 'react';
import './Register.css'
import {useForm, useFormWithValidation} from '../UseForm/UseForm';

function Register(props) {
    const formData = useForm();
    const checkForm = useFormWithValidation();
    
    const handleChange = (e) => {
        formData.handleChange(e);
        checkForm.handleChange(e);
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        props.onRegister(formData.values)
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
                    <input required minLength="2" maxLength="40" type="text" className="login__input" id="name" value={formData.values.name} onChange={handleChange} name="name"/>
                    <span id="name-error" className="login__error">{checkForm.errors.name}</span>
                </div>
                <div className="login__constructor">
                    <p className="login__signature">E-mail</p>
                    <input required minLength="2" maxLength="40" type="email" className="login__input" id="email" value={formData.values.email} onChange={handleChange} name="email"/>
                    <span id="name-error" className="login__error">{checkForm.errors.email}</span>
                </div>
                <div className="login__constructor">
                    <p className="login__signature">Пароль</p>
                    <input required minLength="8" type="password" className="login__input" id="password" value={formData.values.password} onChange={handleChange} name="password"/>
                    <span id="name-error" className="login__error">{checkForm.errors.password}</span>
                </div>
                <p className="login__error">{props.message}</p>
                <button className="login__button">Зарегистрироваться</button>
            </form>
            <p className="login__question">
                Уже зарегистрированы? <Link className="login__redirection" to='/signin'>Войти</Link>
            </p>
        </section>
    )
}

export default Register;
