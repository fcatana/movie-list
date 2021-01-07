//import React from 'react'
import React, { useState} from 'react'
import { Button } from '@material-ui/core'
import TrashIcon from '@material-ui/icons/Delete'
import StarIcon from '@material-ui/icons/StarOutlined'
import styles from './SavedActors.module.css'

const ActorItem = (props) => {
    
    
    const actor = props.actor
    const imgUrl = `https://image.tmdb.org/t/p/w300${actor.profile_path}`
    const [ratings, setRatings] = useState([
        { id: 0, active: false },
        { id: 1, active: false },
        { id: 2, active: false },
        { id: 3, active: false },
        { id: 4, active: false },
      ])
    return (
        <li className= "actor_item">
            <span className="actor_poster">
                <img src= {imgUrl} alt={actor.name}/>
            </span>
            <span className="actor_title">{actor.name}</span>
            <span>{actor.release_date}</span>
            <span>{actor.vote_average}</span>
            <span>
                <Button onClick = {() => props.onActorAdd(actor.id)}>
                    <TrashIcon />
                </Button>
            </span>
            <span>
            {ratings.map((item, index) => {
          return (
            <StarIcon
              className={[styles.star, item.active && styles.active].join(' ')}
            />
          )
        })}  
            </span>
        </li>
    )
}
       

const SavedActors = (props) => {
    return(
        <div>
            {props.savedActors && props.savedActors.length > 0 ? (
                <ul>
                    {props.savedActors.map ((actor) => (
                        <ActorItem 
                        actor={actor}
                        onActorDelete={props.onActorDelete}
                        key={actor.id}
                     />
                    ))}
                </ul>
    ) : (
        'No saved actors'
            )}
        </div>
    )
}
export default SavedActors