import React from 'react';
import './App.css';
import Header from './shared/Header';
import SavedMovies from './savedmovies/SavedMovies'
import SearchBox from './search/SearchBox'
import SavedActors from './savedactors/SavedActors'



class App extends React.Component {
constructor (props){
  super(props)
  
  this.handleAddActor = this.handleAddActor.bind(this);
  const movies= JSON.parse(window.localStorage.getItem('saved-movies'))
  if (movies && Array.isArray(movies)) {
    this.state = {
      movies,
    }
  } else {
    this.state = {
      movies: [],
    }
  }
 
}
handleAddMovie = (movie) => {
  const movies = this.state.movies
  this.setState(
    {
      movies: [...movies, movie],
    },
    () => {
      window.localStorage.setItem(
        'saved-movies',
        JSON.stringify(this.state.movies),
      )
    },
  )
}

handleAddActor = (actor) => {
  const actors_movies = this.state.actors
  this.setState(
    {
      actors_movies: [...actors_movies, actor],
    },
    () => {
     // window.localStorage.setItem(
     //   'saved-actors',
      //  JSON.stringify(this.state.actors),
      //)
      
      {actor.known_for.map(actor_movie => <div>{actor_movie.original_title}</div>)}
    },
  )
}

handleDeleteMovie = (movieId) => {
  console.log ('deleting' , movieId)
  const index = this.state.movies.findIndex(movie => movie.id === movieId)
  this.setState(
    {
      movies: this.state.movies.filter (item => item.id !== movieId),
    },
    () => {
      window.localStorage.setItem(
        'saved-movies',
        JSON.stringify (this.state.movies),
      )
    },
  )
}

render () {
 // const search_mode = useState('movies')
  let search_m;
  let saved_list;
  if (SearchBox.searchMode === 'movies'){
    search_m =  <SearchBox onMovieAdd= {this.handleAddMovie} />
    saved_list = <SavedMovies
    savedMovies = {this.state.movies}
    onMovieDelete = {this.handleDeleteMovie}
    />
  }
  else{
  
    search_m =  <SearchBox onActorAdd= {this.handleAddActor} />
    saved_list = <SavedActors
    savedActors={this.state.actors}
    />
  }
  console.log("search mode moviie", this.props.movie);
  return (
    <div className="App">
      <Header />
      <SearchBox onMovieAdd= {this.handleAddMovie} />
    <SavedMovies
    savedMovies={this.state.movies}
    onMovieDelete={this.handleDeleteMovie}
    />
     
    </div>
  )
}
}

export default App
