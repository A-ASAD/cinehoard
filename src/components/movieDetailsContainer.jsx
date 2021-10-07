import React from 'react'

import Rating from './rating';
import '../styles/movieDetailsContainer.css'
import { Toast, ToastContainer } from 'react-bootstrap';
import { useState } from 'react';

export default function MovieDetailsContainer({
        poster_path,
        title,
        release_date,
        vote_average,
        genres,
        overview,
        toggleWatchlist,
        toggleFavourite,
        is_in_watchList: isInWatchlist,
        is_favourite: isFavourite,
    }) {

    const [favouriteAdded, setFavouriteAdded] = useState(false);
    const [favouriteRemoved, setFavouriteRemoved] = useState(false);
    const [watchlistAdded, setWatchlistAdded] = useState(false);
    const [watchlistRemoved, setWatchlistRemoved] = useState(false);

    const handleToogleFavourite = () => {
        toggleFavourite();
        isFavourite?setFavouriteRemoved(true):setFavouriteAdded(true);
    }

    const handleToogleWatchlist = () => {
        toggleWatchlist();
        isInWatchlist?setWatchlistRemoved(true):setWatchlistAdded(true);
    }

    function handleImageError(e){
        e.target.src = '/assets/posterDefault.jpeg'
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
                    src={`/assets/posterDefault.jpeg`}
                    alt='poster'
                />
            }
            <div className='details'>
                <div className='title'>{title} ({release_date.slice(0, 4)})</div>
                <div className='buttons'>
                    <div title='Add to watchlist' onClick={handleToogleWatchlist}>
                        <i className={`fas fa-bookmark ${isInWatchlist ? 'text-info' : ''}`}></i>
                    </div>
                    <div title='Mark as favourite' onClick={handleToogleFavourite}>
                        <i className={`fas fa-heart ${isFavourite ? 'text-danger' : ''}`}></i>
                    </div>
                </div>
                <h5 className='mt-2'>User Rating</h5>
                <div className='rating'><Rating value={vote_average} /></div>
                <div className='mt-4 d-flex flex-wrap genres'>
                    {
                        genres.map((genre, id) => (
                            <div key={id} className='me-2'>{genre.name}</div>
                        ))
                    }
                </div>
                <h5 className='mt-4'>Overview</h5>
                <div>{overview}</div>
            </div>
            <ToastContainer className="p-3" position={'middle-end'}>
                <Toast show={favouriteAdded} onClose={()=>setFavouriteAdded(false)} bg={'light'} delay={2000} autohide>
                    <Toast.Body className='text-dark'>Added to favourites</Toast.Body>
                </Toast>
                <Toast show={favouriteRemoved} onClose={()=>setFavouriteRemoved(false)} bg={'light'} delay={2000} autohide>
                    <Toast.Body className='text-dark'>Removed from favourites</Toast.Body>
                </Toast>
                <Toast show={watchlistAdded} onClose={()=>setWatchlistAdded(false)} bg={'light'} delay={2000} autohide>
                    <Toast.Body className='text-dark'>Added to watchlist</Toast.Body>
                </Toast>
                <Toast show={watchlistRemoved} onClose={()=>setWatchlistRemoved(false)} bg={'light'} delay={2000} autohide>
                    <Toast.Body className='text-dark'>Removed from watchlist</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}
