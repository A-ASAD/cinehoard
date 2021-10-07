import React, { useState } from 'react'
import { useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import WatchlistItem from '../components/watchlistItem';
import { sendRequest } from '../wrappers/apiWrappers';

export default function Watchlist() {

    const [toWatch, setToWatch] = useState(null);
    const [watched, setWatched] = useState(null);
    const [updateCount, setUpdateCount] = useState(0);
    const {token} = useSelector(state => state.auth);

    const fetchWatchlist = async () => {
        let response = await sendRequest(
            `watchlist/get-watchlist/`,
            'get',
            token,
            );
        if(!response.error){
            setWatched([...response.watched]);
            setToWatch([...response.to_watch]);
        }
        else{
            setWatched([]);
            setToWatch([]);
        }
    }

    const toggleWatchlist = async (id, to_watch=false) => {
        let response = await sendRequest(
            `watchlist/toggle-watchlist/${id}`,
            'post',
            token,
            );
        if (!response.error && to_watch){
            setToWatch(toWatch.filter(item => item.movie.id !== id))
            setUpdateCount(updateCount+1)
        }
        else if(!response.error && !to_watch){
            setWatched(watched.filter(item => item.movie.id !== id))
            setUpdateCount(updateCount+1)
        }
    }

    const toggleMarkAsWatched = async (id, to_watch=false) => {
        let response = await sendRequest(
            `watchlist/toggle-watched/${id}`,
            'post',
            token,
            );
        if (!response.error && to_watch){
            setToWatch(toWatch.filter(item => item.movie.id !== id))
            setWatched([...watched, {...toWatch.filter(item => item.movie.id === id)[0], is_watched: true}])
            setUpdateCount(updateCount+1)
        }
        else if(!response.error && !to_watch){
            setWatched(watched.filter(item => item.movie.id !== id))
            setToWatch([...toWatch, {...watched.filter(item => item.movie.id === id)[0], is_watched: false}])
            setUpdateCount(updateCount+1)
        }
    }    

    useEffect(() => {
        fetchWatchlist();
        // eslint-disable-next-line
    }, [updateCount])

    return (
        <Container fluid>
            <Row className='mt-4 justify-content-center'>
                <div className='heading mb-3'>
                    <div></div>
                    <h3 className='mx-3'>Watchlist</h3>
                    <div></div>
                </div>
                <h4 className='mb-3'>To Watch</h4>
                {toWatch?
                    toWatch.length?
                        toWatch.map((watchlistItem, id) => (
                            <WatchlistItem
                                key={id}
                                {...watchlistItem.movie}
                                {...watchlistItem}
                                toggleWatchlist={toggleWatchlist}
                                toggleMarkAsWatched={toggleMarkAsWatched}
                                />
                                ))
                                :
                                <div className='text-center'>No movies to watch!</div>
                                :
                                <div className='d-flex justify-content-center py-3 w-100'><Spinner animation='border' /></div>
                            }
                <h4 className='mb-4'>Watched</h4>
                {watched?
                    watched.length?
                    watched.map((watchlistItem, id) => (
                            <WatchlistItem
                                key={id}
                                {...watchlistItem.movie}
                                {...watchlistItem}
                                toggleWatchlist={toggleWatchlist}
                                toggleMarkAsWatched={toggleMarkAsWatched}
                            />
                        ))
                        :
                        <div className='text-center'>No movies watched yet!</div>
                        :
                        <div className='d-flex justify-content-center py-3 w-100'><Spinner animation='border' /></div>
                }
            </Row>
        </Container>
    )
}
