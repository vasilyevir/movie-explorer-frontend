import { Link } from 'react-router-dom';
import './NotFounded.css';


function NotFounded() {
    
    return (
        <div className="not-founded">
            <h1 className="not-founded__head">404</h1>
            <p className="not-founded__paragraph">Страница не найдена</p>
            <Link to="/" className="not-founded__button">Назад</Link>
        </div>
    )
}

export default NotFounded;
