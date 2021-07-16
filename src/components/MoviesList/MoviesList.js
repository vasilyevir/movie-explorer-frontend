import { useContext } from 'react';
import CurrentMoviesContext from '../../contexts/CurrentMoviesContext';
import Card from '../Card/Card';

function MoviesList(props) {
    
    return (
        <section className="movies-cardlist">
            {props.moviesList.map((item, id)=>(
                <Card
                    shortFilm={props.shortFilm}
                    nameFilm={props.nameFilm}
                    key = {id}
                    films = {item}
                    like = {props.cardLike}
                    savedMovies = {false}
                    deleteLike={props.deleteLike}
                    // isOpen={}
                />
            )
            )}
        </section>
    )
}


export default MoviesList;
