import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/searchSuggestion.css'


export default function SearchSuggestion({ id, poster_path, title, release_date }) {

    function handleImageError(e) {
        e.target.src = '/assets/posterDefault.jpeg'
    }


    return (
        <Link to={`/movie/${id}`} className='search-suggestion'>
            <div>
                {poster_path ?
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
                    <div className='title'>{title}</div>
                    <div className='release-date'>({release_date.slice(0, 4)})</div>
                </div>
            </div>
        </Link>
    )
}
