import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { useState ,useEffect} from 'react';
import { MovieList } from './components/MovieList';
import {MovieListHeading} from './components/MovieListHeading';
import { SearchBox } from './components/SearchBox';
import { AddFavourites } from './components/AddFavourites';
import { RemoveFavourites } from './components/RemoveFavourites';

function App() {
const [movies,setMovies] = useState([]);
const [searchValue,setSearchValue] = useState("")
const [favourites, setFavourites] = useState([])

const getMovieRequest = async(searchValue) =>{
  const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=e7b40d15`
  const response = await fetch(url)
  const responseJson = await response.json();
  setMovies(responseJson?.Search)
}

useEffect(() => {
 getMovieRequest(searchValue)
}, [searchValue])

useEffect( ()=>{
  const favouriteMovies = JSON.parse(localStorage.getItem('react-movie-app-favourites'));
  if(favouriteMovies){
    setFavourites(favouriteMovies)
  }
},[])

const saveToLocalStorage = (items) => {
  localStorage.setItem('react-movie-app-favourites',JSON.stringify(items));
}

const addFavouriteMovie =(movie) => {
const newFavouriteMovies = [...favourites,movie];
setFavourites(newFavouriteMovies)
saveToLocalStorage(newFavouriteMovies)
}

const removeFavouriteMovie = (movie) =>{
  const newFavouriteMovies = favourites.filter(fav => fav.imdbID !== movie.imdbID);
  setFavourites(newFavouriteMovies)
  saveToLocalStorage(newFavouriteMovies)
}
  return (
    <div className="container-fluid movie-app">
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading
        heading = {"Movies"}
        />
        <SearchBox
        setSearchValue ={setSearchValue}
        searchValue = {searchValue}
        />
      </div>
      <div className='row'>

      <MovieList
      movies = {movies}
      handleFavouritesClick ={addFavouriteMovie}
      FavouriteComponent ={AddFavourites} 
      ></MovieList>
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading
        heading = {"Favourites"}
        />
        </div>
        <div className='row'>

<MovieList
movies = {favourites}
handleFavouritesClick ={removeFavouriteMovie}
FavouriteComponent ={RemoveFavourites} 
></MovieList>
</div>
    </div>
  );
}

export default App;
