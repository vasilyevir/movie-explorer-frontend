import './Card.css';


function Card(props) {
    
    return (
        <div className="card">
            <img src={props.filmsImage} alt={props.filmsName} className="card__image"/>
            <div className="card__underline">
                <p className="card__name">{props.filmsName}</p>
                {props.child}
            </div>
            <div className="card__constructor-time">
                <p className="card__film-length">{props.filmsLength}</p>
            </div>
        </div>
    )
}

export default Card;
