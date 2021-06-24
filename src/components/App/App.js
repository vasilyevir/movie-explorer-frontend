import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import NotFounded from '../NotFounded/NotFounded';
import SavedMovies from '../SavedMovies/SavedMovies';
import { Route, Switch } from 'react-router-dom';

function App() {

  return (
    <div className="root">
      <Switch>
        <Route exact path='/'>
          <Main/>
        </Route>
        <Route path='/signin'>
          <Login/>
        </Route>
        <Route path='/signup'>
          <Register/>
        </Route>
        <Route path='/movies'>
          <Movies/>
        </Route>
        <Route path='/saved-movies'>
          <SavedMovies/>
        </Route>
        <Route path='/profile'>
          <Profile/>
        </Route>
      </Switch>
      <Route path="*">
        <NotFounded/>
      </Route>
    </div>
  );
}

export default App;