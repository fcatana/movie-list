import React, { useState } from 'react'
import {
  Button,
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
  Paper,
  Grid,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import {searchMovies, searchActors} from '../shared/API'

import styles from './SearchBox.module.css'

const MovieList = (props) => {
  return (
    <div>
      <ul className={styles.list}>
        {props.movies.map((movie) => (
          <Paper>
            <li className={styles.listItem} key={movie.id}>
              <Grid container>
                <Grid item md={2}>
                  <img
                    src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Grid>
                <Grid md={8}>
                  <b>{movie.title}</b> ({movie.release_date})
                </Grid>
                <Grid md={2}>
                  <Button
                    className={styles.addMovie}
                    color="secondary"
                    onClick={(e) => {
                      e.preventDefault()
                      props.onMovieAdd(movie)
                    }}>
                    <AddIcon /> Add movie
                  </Button>
                </Grid>
              </Grid>
            </li>
          </Paper>
        ))}
      </ul>
    </div>
  )
}

const ActorList = (props) => {
  return (
    <div>
      <ul className={styles.list}>
        {props.actors.map((actor) => (
          <Paper>
            <li className={styles.listItem} key={actor.id}>
              <Grid container>
                <Grid item md={2}>
                  <img
                    src={`https://image.tmdb.org/t/p/w154${actor.profile_path}`}
                    alt={actor.gender}
                  />
                </Grid>
                <Grid md={4}>
                  <b>{actor.name}</b> (Rating : {actor.popularity})
                </Grid>
                <Grid md={4}>
                 Movies known for: 
                </Grid>
                <Grid list md={2} >
                      {actor.known_for.map(actor_movie => <li>{actor_movie.original_title} </li>)} 

                    </Grid>
              
                  
              </Grid>
            </li>
          </Paper>
        ))}
      </ul>
    </div>
  )
}


const SearchBox = (props) => {
  const [term, setTerm] = useState('')
  const [movies, setMovies] = useState([])
  const [actors, setActors] = useState([])
  const [searchMode, setSearchMode] = useState('movies')
  
  
  const localActorAdd = (actor) => {
    setActors([])
    props.onActorAdd(actor)

  }
  const localMovieAdd = (movie) => {
    setMovies([])
    props.onMovieAdd(movie)
  }
  
  let label_display;
  if (searchMode === 'movies'){
    label_display =   <TextField
    label=  "Search for a movie"
    variant="outlined"
    value={term}
    onChange={(e) => {
      setTerm(e.target.value)
    }}
  />
  }
  else{
    label_display  =   <TextField
    label=  "Search for an actor"
    variant="outlined"
    value={term}
    onChange={(e) => {
      setTerm(e.target.value)
    }}
  />
  }
  
  return (
    <div className={styles.main}>
      <div className={styles.box}>
       {label_display}
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            
             searchMode === 'movies'
               ? searchMovies(term).then((res) =>   setMovies(res.data.results)) && setActors([])
               : searchActors(term).then((res) =>   setActors(res.data.results)) && setMovies([])
          }>
          Search
        </Button>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top">
          <FormControlLabel
            value="top"
            control={<Radio color="primary" />}
            label="Movies"
            labelPlacement="start"
            checked={searchMode === 'movies'}
            onChange={() => setSearchMode('movies')}
          />
          <FormControlLabel
            value="start"
            control={<Radio color="primary" />}
            label="Actors"
            labelPlacement="start"
            checked={searchMode === 'actors'}
            onChange={() => setSearchMode('actors')}
          />
        </RadioGroup>
      </div>

      <MovieList movies={movies} onMovieAdd=  {localMovieAdd}/>
      <ActorList actors={actors} onActorAdd= {localActorAdd}/>
    </div>
  )
}


export default SearchBox