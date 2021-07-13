import './Card.css';


function Card(props) {
    const durationHours =(props.films.duration - props.films.duration % 60)/60 + 'ч';
    const durationMinutes = props.films.duration % 60 + 'м';
    let movieShow;
    if (props.savedMovies){
        //сохраненные фильмы
        if (props.nameFilm){
            //задан поиск
            if (props.shortFilm) {
                //задан
                if (props.films.isSearched){
                    // найден
                    if (props.films.isLiked){
                        movieShow = true;
                    } else {
                        movieShow = false;
                    }
                } else {
                    if (props.films.isLiked){
                        movieShow = true;
                    } else {
                        movieShow = false;
                    }
                }
            } else {
                if (props.films.isSearched){
                    // найден
                    if (props.films.isLiked){
                        movieShow = true;
                    } else {
                        movieShow = false;
                    }
                } else {
                    movieShow = false;
                }
            }
        } else {
            if (props.shortFilm) {
                //задан
                if (props.films.isSearched){
                    // найден
                    if (props.films.isLiked){
                        movieShow = true;
                    } else {
                        movieShow = false;
                    }
                } else {
                    movieShow = false;
                }
            } else { 
                if (props.films.isLiked){
                    movieShow = true;
                } else {
                    movieShow = false;
                }
            }
        }
    } else {
        if (props.isOpen) {
            // после открытия страницы
            if (props.films.isSearched){
                // найден
                movieShow = true;
            } else {
                movieShow = false;
            }

        } else {
            if (props.nameFilm){
                //задан поиск
                if (props.shortFilm) {
                    //задан
                    if (props.films.isSearched){
                        // найден
                        movieShow = true;
                    } else {
                        movieShow = false;
                    }
                } else {
                    if (props.films.isSearched){
                        // найден
                        movieShow = true;
                    } else {
                        movieShow = false;
                    }
                }
            } else {
                if (props.shortFilm) {
                    //задан
                    if (props.films.isSearched){
                        // найден
                        movieShow = true;
                    } else {
                        movieShow = false;
                    }
                } else {
                    if (props.films.show){
                        movieShow = true;
                    } else {
                        movieShow = false;
                    }
                }
            }
        }
    }

    const handleCardLike = () => {
        props.like(props.films)
        .catch(err => console.log(err));
        // localStorage.setItem('movies', JSON.stringify(currentMovies))
        // console.log(currentMovies, 'like card', JSON.parse(localStorage.movies))
    }

    const handleCardDeleteLike = () => {
        props.deleteLike(props.films._id)
    }


    return (
        <div className={movieShow ? "card" : "card card_invisible"}>
            <a href={props.films.trailer}>
                <img src={props.films.image} alt={props.films.nameRU} className="card__image"/>
            </a>
            <div className="card__underline">
                <p className="card__name">{props.films.nameRU}</p>
                { 
                    props.savedMovies ? ( <button onClick={handleCardDeleteLike} className="card__button-delete"></button> ) :
                    ( <button onClick={props.films.isLiked ? handleCardDeleteLike : handleCardLike} className={props.films.isLiked ? "card__button-like card__button-like_is-liked" : "card__button-like" }></button> )
                }
            </div>
            <div className="card__constructor-time">
                <p className="card__film-length">{durationHours === '0ч' ?  `${durationMinutes}` : `${durationHours} ${durationMinutes}`}</p>
            </div>
        </div>
    )
}

export default Card;
