import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Main.css'
import {Link} from 'react-router-dom';
import Avatar from '../../images/Avatar.jpeg';
import Arrow from '../../images/arrow.svg'

function Main(props) {
    
    return (
        <>
            <div className="mainpage">
                <Header
                    header = {true}
                >
                    <div className="header__nav-bar">
                        <Link className="header__register" to={props.loggedIn ? '/signup' : '/movies'}>Регистрация</Link>
                        <Link className="header__login" to={ props.loggedIn ? '/signin' : '/movies'}>Войти</Link>
                    </div>
                </Header>
                <div className="mainpage__landing">
                    <div className="mainpage__landing-image"></div>
                    <h1 className="mainpage__landing-heading">Учебный проект студента факультета Веб-разработки.</h1>
                </div>
            </div>
            <div className="navbar">
                <div className="navbar__links">
                    <Link to="#about" className="navbar__link">О проекте</Link>
                    <Link to="#technology" className="navbar__link">Технологии</Link>
                    <Link to="#student" className="navbar__link">Студент</Link>
                </div>
            </div>
            <div id="about" className="about">
                <h2 className="about__head">О проекте</h2>
                <div className="about__info">
                    <div className="about__heading">Дипломный проект включал 5 этапов</div>
                    <div className="about__paragraphs">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</div>
                    <div className="about__heading">На выполнение диплома ушло 5 недель</div>
                    <div className="about__paragraphs">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</div>
                </div>
                <div className="about__time">
                    <div className="about__time-line">1 неделя</div>
                    <div className="about__time-line about__time-line_grey">4 недели</div>
                    <div className="about__time-text">Back-end</div>
                    <div className="about__time-text">Front-end</div>
                </div>
            </div>
            <div id="technology" className="technology">
                <div className="technology__container">    
                    <h2 className="technology__head">Технологии</h2>
                    <div className="technology__info">
                        <h3 className="technology__header">7 технологий</h3>
                        <p className="technology__paragraph">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                        <div className="technology__row">
                            <div className="technology__lang">HTML</div>
                            <div className="technology__lang">CSS</div>
                            <div className="technology__lang">JS</div>
                            <div className="technology__lang">React</div>
                            <div className="technology__lang">Git</div>
                            <div className="technology__lang">Express.js</div>
                            <div className="technology__lang">mongoDB</div>
                        </div>
                    </div>
                </div>
            </div>
            <div name="student" className="student">
                <h2 className="student__head">Студент</h2>
                <div className="student__container">
                    <img src={Avatar} alt="Аватар" className="student__avatar"/>
                    <h2 className="student__heading">Илья</h2>
                    <h3 className="student__profile">Фронтенд-разработчик, 20 лет</h3>
                    <p className="student__about-me">Я родился и живу в Санкт-Петербурге, учусь на робототехнике и мехатронике в СПбПУ. Занимался легкой атлетикой и добился там серьзных результатов, несколько раз был призером первенства России. Недавно начал кодить. После того, как прошёл курс по веб-разработке, хочу добиться высоких результатов и в данной сфере.</p>
                    <a href="https://vk.com/vas.il400mh" className="student__link">Vkontakte</a>
                    <a href="https://github.com/vasilyevir" className="student__link">Github</a>
                </div>
                <div className="student__portfolio">
                    <h3 className="student__profile student__profile_portfolio">Портфолио</h3>
                    <a href="https://github.com/vasilyevir/how-to-learn/blob/master/index.html" className="student__block-site">
                        <p className="student__text-site">Статичный сайт</p>
                        <img src={Arrow} alt="Стрелка" className="student__arrow"/>
                    </a>
                    <a href="https://github.com/vasilyevir/russian-travel" className="student__block-site">
                        <p className="student__text-site">Адаптивный сайт</p>
                        <img src={Arrow} alt="Стрелка" className="student__arrow"/>
                    </a>
                    <a href="https://github.com/vasilyevir/react-mesto-api-full" className="student__block-site">
                        <p className="student__text-site">Одностраничное приложение</p>
                        <img src={Arrow} alt="Стрелка" className="student__arrow"/>
                    </a>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Main;
