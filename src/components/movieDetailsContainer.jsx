import React from 'react'

import Rating from './rating';
import '../styles/movieDetailsContainer.css'
import { useSelector } from 'react-redux';


export default function MovieDetailsContainer() {
    const {
        poster_path,
        title,
        release_date,
        vote_average,
        genres,
        overview,
        toggleWatchlist,
        toggleFavourites,
        isInWatchlist,
        isFavourite,
    } = useSelector(state => state.movieDetails);

    function handleImageError(e){
        e.target.src = '/assets/poster_default.jpeg'
    }

    return (
        <div className='movie-details'>
            {poster_path?
                <img
                    className='poster'
                    src={`https://image.tmdb.org/t/p/original${poster_path}`}
                    alt="Can't load poster"
                    onError={handleImageError}
                />
                :
                <img
                    className='poster'
                    src={`/assets/poster_default.jpeg`}
                    alt='poster'
                />
            }
            <div className='details'>
                <div className='title'>{title} ({release_date.slice(0, 4)})</div>
                <div className='buttons'>
                    <div title='Add to watchlist' onClick={toggleWatchlist}>
                        <i className={`fas fa-bookmark ${isInWatchlist ? 'text-info' : ''}`}></i>
                    </div>
                    <div title='Mark as favourite' onClick={toggleFavourites}>
                        <i className={`fas fa-heart ${isFavourite ? 'text-danger' : ''}`}></i>
                    </div>
                </div>
                <h5 className='mt-2'>User Rating</h5>
                <div className='rating'><Rating value={vote_average} /></div>
                <h5 className='mt-4'>Genres</h5>
                <div className='d-flex flex-wrap'>
                    {
                        genres.map((genre, id) => (
                            <div key={id} className='me-2'>{genre.name}</div>
                        ))
                    }
                </div>
                <h5 className='mt-4'>Overview</h5>
                <div>{overview}</div>
            </div>
        </div>
    )
}
