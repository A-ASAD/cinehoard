import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import WatchlistItem from '../components/watchlistItem';

export default function Watchlist() {

    const [watchlist, setWatchlist] = useState(null);
    const {token} = useSelector(state => state.auth);
    
    const fetchWatchlist = async () => {
        let response = await fetch('http://localhost:8000/api/watchlist/get-watchlist',
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        response = await response.json();
        if(!response.error)
            setWatchlist(response)
    }

    const toggleWatchlist = async (id) => {
        let response = await fetch(`http://localhost:8000/api/watchlist/toggle-watchlist/${id}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        response = await response.json();
        if (!response.error)
            setWatchlist(watchlist.filter(movie => movie.id !== id))
    }

    useEffect(() => {
        fetchWatchlist();
        // eslint-disable-next-line
    }, [watchlist])

    return (
        <Container fluid>
            <Row className='mt-4 justify-content-center'>
                {watchlist?
                    watchlist.length?
                        watchlist.map((movie, id) => (
                            <WatchlistItem key={id} {...movie} toggleWatchlist={toggleWatchlist}/>
                        ))
                        :
                        <div className='text-center'>No movies added yet!</div>
                        :
                        <div className='d-flex justify-content-center py-3 w-100'><Spinner animation='border' /></div>
                }
            </Row>
        </Container>
    )
}
