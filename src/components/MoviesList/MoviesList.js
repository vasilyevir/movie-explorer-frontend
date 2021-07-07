import { useContext } from 'react';
import CurrentMoviesContext from '../../contexts/CurrentMoviesContext';
import Card from '../Card/Card';

function MoviesList(props) {
    const [currentMovies, setCurrentMovies] = useContext(CurrentMoviesContext);

    return (
        <section className="movies-cardlist">
            {currentMovies.map((item, id)=>(
                <Card
                    shortFilm={props.shortFilm}
                    nameFilm={props.nameFilm}
                    key = {id}
                    films = {item}
                    like = {props.cardLike}
                    savedMovies = {false}
                    deleteLike={props.deleteLike}
                />
            )
            )}
        </section>
    )
}


export default MoviesList;
