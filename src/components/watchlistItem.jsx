import { Button } from 'react-bootstrap'
import React from 'react'

import '../styles/watchlistItem.css'
import { Link } from 'react-router-dom'

export default function WatchlistItem({id, poster_path, title, release_date, toggleWatchlist}) {

    function handleImageError(e){
        e.target.src = '/assets/poster_default.jpeg'
    }

    return (
        <div className='favourite-item mx-3 my-3'>
            {poster_path ?
                <img
                    src={`https://image.tmdb.org/t/p/original${poster_path}`}
                    alt="Can't load poster"
                    onError={handleImageError}
                />
                :
                <img
                    src={`/assets/poster_default.jpeg`}
                    alt='poster'
                />
            }
            <div className='ms-2'>
                <div>
                    <h5 className='title'>{title}</h5>
                    <div>
                        {release_date.slice(0, 4)}
                    </div>
                </div>
                <div className='mt-3 px-3 pb-2'>
                    <Link to={`/movie/${id}`}><Button variant='secondary' size='sm' className='w-100'>View Details</Button></Link>
                    <Button variant='secondary' size='sm' className='w-100 my-2'>Mark as Watched</Button>
                    <Button variant='secondary' size='sm' onClick={() => toggleWatchlist(id)} className='w-100'>Remove</Button>
                </div>
            </div>
        </div>
    )
}
