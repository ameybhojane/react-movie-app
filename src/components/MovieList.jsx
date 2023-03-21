import React from 'react'

export const MovieList = (props) => {
    const {movies=[] ,FavouriteComponent ,handleFavouritesClick} = props
  return (
    <>
    {
        movies.map( movie => (<div className='image-container d-flex justify-content-start m-3'>
            <img 
            src = {movie?.Poster} 
            alt = {movie?.Title}
            >     
            </img>
            <div className='overlay d-flex align-items-center justify-content-center'
            onClick={()=> handleFavouritesClick(movie)}
            >
            <FavouriteComponent/>
            </div>
        
        </div>))
    }
    </>
  )
}
