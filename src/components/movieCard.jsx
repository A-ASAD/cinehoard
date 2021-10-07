import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/movieCard.css'


export default function MovieCard({id, poster_path, title, release_date}) {

    function handleImageError(e){
        e.target.src = '/assets/posterDefault.jpeg'
    }

    return (
        <Link to={`/movie/${id}`} className='movieCard'>
            <div>
                {poster_path?
                    <img
                        src={`https://image.tmdb.org/t/p/original${poster_path}`}
                        alt="Can't load poster"
                        onError={handleImageError}
                    />
                    :
                    <img
                        src={`/assets/posterDefault.jpeg`}
                        alt='poster'
                    />
                }
                <div>
                    <div className='movieCardTitle'>{title}</div>
                    <div>
                        {release_date.slice(0,4)}
                    </div>
                </div>
            </div>
        </Link>
    )
}
